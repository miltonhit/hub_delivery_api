import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonsModule } from './commons/commons.module';
import { UsersModule } from './users/users.module';

const STAGE = process.env.STAGE;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.cwd()}/config/env/${process.env.STAGE}.env` }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
