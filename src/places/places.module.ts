import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesRepository } from './repositories/places.repository';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  imports: [CommonsModule],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesRepository]
})
export class PlacesModule {}
