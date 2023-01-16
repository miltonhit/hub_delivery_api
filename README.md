## hub-delivery-api
This API manages users, orders and other things of a food delivery.<br>
**UNDER CONSTRUCTION**

## Stack
-> Node16+ with [NestJs](https://nestjs.com/)<br />
-> [Lambda](https://aws.amazon.com/lambda/) with [DynamoDB](https://aws.amazon.com/dynamodb/) and [Api Gateway](https://aws.amazon.com/api-gateway/)<br />
-> Serverless framework<br />

## To run locally
Run those commands in the terminal:
1. npm install
2. npm dynamo (keep open)
3. npm run start
4. curl http://localhost:8000/service/status

## To deploy (aws provider)
1. Install [serverless framework](https://github.com/nestjs/typescript-starter)
2. run this command: serverless deploy

## Postman Documentation
[Version 0.0.1](https://documenter.getpostman.com/view/1334597/2s8YzZNe9C)
