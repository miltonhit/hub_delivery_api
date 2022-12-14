import { Injectable } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";
import { DataMapper, QueryIterator } from "@aws/dynamodb-data-mapper";
import { get } from 'env-var';

@Injectable()
export class DynamoDbService {
  private client: DynamoDB;
  public mapper: DataMapper;

  constructor() {
    var region: string = "us-east-1";
    var endpoint: string = null;

    if (get("DB_RUN_LOCAL").asBool()) {
      console.log("DB_LOCAL: ON");
      //
      //
      region = "localhost";
      endpoint = "http://localhost:8000";
    }

    this.client = new DynamoDB({
      region: region,
      endpoint: endpoint
    });
  }

  async put(params: any): Promise<any> {
    return await this.mapper.put(params);
  }

  async scan(domain: any) {
    const response = [];
    for await (const item of this.mapper.scan(domain)) {
      response.push(item);
    }
    return response;
  }

  async delete(item: any): Promise<void> {
    await this.mapper.delete(item);
  }

  async update(item: any): Promise<any> {
    return await this.mapper.update(item);
  }

  async query(
    entity: any,
    query: any,
    options?: {
      indexName?: string;
    }
  ): Promise<QueryIterator<typeof entity>> {
    console.log(entity);
    console.log(query);
    
    return await this.mapper.query(entity, query, options);
  }

  async get(entity: any): Promise<typeof entity> {
    return await this.mapper.get(entity);
  }
}