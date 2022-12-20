
import { table, attribute, hashKey } from "@aws/dynamodb-data-mapper-annotations";
import { Address } from "./address.entity";

@table('hub-users-dev')
export class User {
  public constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }

  @hashKey()
  id: string;
  @attribute()
  cpf: string;
  @attribute()
  email: string;
  @attribute()
  password: string;
  @attribute()
  nome?: string;
  @attribute()
  celular?: string;
  @attribute()
  adresses: Address[];
  @attribute()
  createdAt?: Date;
  @attribute()
  updatedAt?: Date;
}