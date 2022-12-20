import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ErrorsConst } from 'src/commons/exceptions/error-def.entity';
import { ServiceException } from 'src/commons/exceptions/service-exception';
import { CreatePlaceDto } from './dto/create-place.dto';
import { MenuSectionItemDto } from './dto/menu-section-item.dto';
import { MenuSectionDto } from './dto/menu-section.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Address } from './entities/address.entity';
import { MenuSection } from './entities/menu-section';
import { MenuSectionItem } from './entities/menu-section-item';
import { Place } from './entities/place.entity';
import { PlacesRepository } from './repositories/places.repository';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PlacesRepository) {
  }

  async create(userId: string, dto: CreatePlaceDto): Promise<Place> {
    var uniqueId: string = randomUUID();
    
    var place: Place = await this.repository.create(
      new Place({
        id: uniqueId,
        ownerId: userId,
        whatsappContact: dto.whatsappContact,
        title: dto.title,
        imageUrl: dto.imageUrl,
        listed: false,
        address: new Address({
          zipcode: dto.address.zipcode,
          street: dto.address.street,
          number: dto.address.number,
          complement: dto.address.complement,
          city: dto.address.city,
          state: dto.address.state,
          district: dto.address.district,
          lat: dto.address.lat,
          lng: dto.address.lng
        })
      })
    );

    return place;
  }

  async listByOwner(userId: string, completeObj?: boolean): Promise<Place[]> {
    var places: Place[] = await this.repository.listByOwner(userId, completeObj);

    if (places != null) {
      places.forEach(function(value) {
        value.menuSections = null;
      })
    }

    return places;
  }

  async listByDistance(lat: number, lng: number, distanceInMeters: number): Promise<Place[]> {
    var places: Place[] = await this.repository.listByDistance(lat, lng, distanceInMeters);
    
    if (places != null) {
      places.forEach(function(value) {
        value.menuSections = null;
      })
    }

    return places;
  }

  async getById(id: string) {
    return await this.repository.getById(id);
  }

  async saveMenuSection(userId: string, dto: MenuSectionDto): Promise<Place> {
    var place: Place = await this.repository.getById(dto.placeId);

    if (place == null || place.ownerId != userId) {
      throw new ServiceException({
        errorDef: ErrorsConst.notAllowed
      });
    }
    
    if (place.menuSections == null)
      place.menuSections = new Array();

    var menuSectionToEdit: MenuSection = null;

    if (dto.id != null) {
      place.menuSections.forEach(function (value) {
        if (value.id === dto.id) {
          menuSectionToEdit = value;
        }
      });

      if (menuSectionToEdit == null) {
        throw new ServiceException({
          errorDef: ErrorsConst.resourceNotFound,
          description: "section not found"
        });
      }
    } else {
      menuSectionToEdit = new MenuSection({
        id: randomUUID()
      });
      place.menuSections.push(menuSectionToEdit);
    }

    //
    //
    menuSectionToEdit.title = dto.title;
    console.log(menuSectionToEdit);
    return await this.repository.update(place);
  }


  async saveMenuItemSection(userId: string, dto: MenuSectionItemDto): Promise<Place> {
    var place: Place = await this.repository.getById(dto.placeId);

    if (place == null || place.ownerId != userId) {
      throw new ServiceException({
        errorDef: ErrorsConst.notAllowed
      });
    }
    
    var sectionToEdit: MenuSection = null;
    var itemToEdit: MenuSectionItem = null;

    if (place.menuSections != null) {
      place.menuSections.forEach(function (value) {
        if (value.id === dto.sectionId) {
          sectionToEdit = value;
        }
      });
    }

    if (sectionToEdit == null) {
      throw new ServiceException({
        errorDef: ErrorsConst.resourceNotFound,
        description: "section not found"
      });
    }

    if (sectionToEdit.itens == null)
      sectionToEdit.itens = new Array();

    if (dto.id != null) {
      sectionToEdit.itens.forEach(function (value) {
        if (value.id === dto.id) {
          itemToEdit = value;
        }
      });

      if (itemToEdit == null) {
        throw new ServiceException({
          errorDef: ErrorsConst.resourceNotFound,
          description: "item not found"
        });
      }
    } else {
      itemToEdit = new MenuSectionItem({
        id: randomUUID()
      });
      sectionToEdit.itens.push(itemToEdit);
    }


    itemToEdit.description = dto.description;
    itemToEdit.imageUrl = dto.imageUrl;
    itemToEdit.multipleChoiceOptions = dto.multipleChoiceOptions;
    itemToEdit.oneChoiceOptions = dto.oneChoiceOptions;
    itemToEdit.title = dto.title;
    itemToEdit.value = dto.value;
    //
    //
    return await this.repository.update(place);
  }
}
