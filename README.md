## hub-delivery-api
This API manages users, orders and other things of a food delivery.

## Stack
-> Node16+ with NestJs
-> Lambda with DynamoDB and Api Gateway
-> Serverless framework

## To run locally
Run those commands in the terminal:
1. npm install
2. npm dynamo (keep open)
3. npm run start
4. curl http://localhost:8000/service/status

## To deploy (aws provider)
1. Install serverless framework ([Click here] (https://www.serverless.com/framework/docs/getting-started))
2. run this command: serverless deploy
