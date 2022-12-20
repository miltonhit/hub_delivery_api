import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/commons/dynamodb.service";
import { Place } from "../entities/place.entity";

@Injectable()
export class PlacesRepository {

  constructor(private ddb: DynamoDbService) {
  }

  async getById(search: string): Promise<Place> {
    var place: Place = null;
    
    try {
      place = await this.ddb.get(new Place({
        id: search
      }));
    } catch(e ) {
      if (e.name != "ItemNotFoundException") {
        throw e;
      } 
    }
    
    return place;
  }

  async create(obj: Place): Promise<Place> {
    await this.ddb.put(obj);
    return obj;
  }

  async update(obj: Place): Promise<Place> {
    await this.ddb.update(obj);
    return obj;
  }

  async remove(obj: Place): Promise<Place> {
    await this.ddb.delete(obj);
    return obj;
  }

  async listByOwner(search: string, completeObj?: boolean): Promise<Place[]> {
    var places: Place[] = new Array();

    for await (const currPlace of this.ddb.mapper.query(
      Place,
      { ownerId: search },
      { indexName: "GsiOwner"})) 
    {
      places.push(completeObj ? await this.getById(currPlace.id) : currPlace);
    }

    return places;
  }

  async listByDistance(lat: number, lng: number, distanceInMeters: number): Promise<Place[]> {
    var places: Place[] = new Array();

    for await (const currPlace of this.ddb.mapper.scan(
      Place,
      {
        limit: 1000
      }))
    {
      places.push(currPlace);
    }

    return places;
  }
}