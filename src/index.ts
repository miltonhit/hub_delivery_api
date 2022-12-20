import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { HttpServiceExceptionFilter } from './commons/filters/http-service-exception.filter';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, {
    logger: console
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpServiceExceptionFilter());
  app.enableCors();
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer()
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
      .promise;
};
