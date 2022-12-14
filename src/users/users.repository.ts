import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/commons/dynamodb.service";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {

  constructor(private ddb: DynamoDbService) {
  }

  async getById(search: string) {
    const keyCondition = {
      partitionKey: 'foo'
    };

    const iterator = await this.ddb.query(User, {
      id: search
    });

    console.log(iterator.count);
    console.log(iterator);
    console.log(search);

    // const record: User = await this.ddb.get(
    //   Object.assign(new User(), {
    //     id: search,
    //     cpf: "39824060804"
    //   })
    // );


    return null;
  }

  async getByEmail(search: String): Promise<User> {
    return null;
  }

  async getByCpf(search: String): Promise<User> {
    return null;
  }

  create(obj: User) {
    this.ddb.put(obj);
    console.log("CRIADO");
  }

  update(obj: User) {

  }

  remove(obj: User) {

  }
}