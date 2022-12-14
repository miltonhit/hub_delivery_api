import {
  attribute,
  autoGeneratedHashKey,
  table,
  hashKey,
  rangeKey
} from "@aws/dynamodb-data-mapper-annotations";

@table(`hub-users-${process.env.STAGE}`)
export class User {
  public constructor(init?:Partial<User>) {
    Object.assign(this, init);
  }

  @hashKey()
  id: string;
  @rangeKey()
  cpf: string;
  @attribute()
  email: string;
  password?: string;
  nome?: string;
  celular?: string;
  createdAt?: Date;
  updatedAt?: Date;
}