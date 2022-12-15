import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/commons/dynamodb.service";
import { User } from "./entities/user.entity";
import {between} from '@aws/dynamodb-expressions';
import { userInfo } from "os";
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
      if (!(e instanceof ItemNotFoundException)) {
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

  create(obj: User): User {
    this.ddb.put(obj);
    return obj;
  }

  update(obj: User): User {
    this.ddb.update(obj);
    return obj;
  }

  remove(obj: User): User {
    this.ddb.delete(obj);
    return obj;
  }
}