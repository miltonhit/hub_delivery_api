import {
  attribute,
  autoGeneratedHashKey,
  table,
  hashKey,
  rangeKey
} from "@aws/dynamodb-data-mapper-annotations";
import { Address } from "./address.entity";

//@table(`hub-users-${process.env.DB_TABLE_SUFFIX}`)
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

  nome?: string;
  celular?: string;
  adresses: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}