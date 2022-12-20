import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/commons/dynamodb.service";
import { User } from "./entities/user.entity";
import { ItemNotFoundException } from "@aws/dynamodb-data-mapper";

@Injectable()
export class UsersRepository {

  constructor(private ddb: DynamoDbService) {
  }

  async getById(search: string): Promise<User> {
    var user: User = null;
    
    try {
      user = await this.ddb.get(new User({
        id: search
      }));
    } catch(e ) {
      if (e.name != "ItemNotFoundException") {
        throw e;
      } 
    }
    
    return user;
  }

  async getByEmail(search: String, completeObj?: boolean): Promise<User> {
    var user: User = null;

    for await (const currUser of this.ddb.mapper.query(
      User,
      { email: search },
      { indexName: "GsiEmail", limit: 1 })) 
    {
      user = completeObj ? await this.getById(currUser.id) : currUser;
    }

    return user;
  }

  async getByCpf(search: String,completeObj?: boolean): Promise<User> {
    var user: User = null;

    for await (const currUser of this.ddb.mapper.query(
      User,
      { cpf: search },
      { indexName: "GsiCpf", limit: 1 })) 
    {
      user = completeObj ? await this.getById(currUser.id) : currUser;
    }

    return user;
  }

  async create(obj: User): Promise<User> {
    await this.ddb.put(obj);
    obj.password = null;
    return obj;
  }

  async update(obj: User): Promise<User> {
    await this.ddb.update(obj);
    return obj;
  }

  async remove(obj: User): Promise<User> {
    await this.ddb.delete(obj);
    return obj;
  }
}