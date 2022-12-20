import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';

const STAGE = process.env.STAGE;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.cwd()}/config/env/${process.env.stage}.env` }),
    UsersModule,
    AuthModule,
    PlacesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
