import { Address } from "../entities/address.entity";
import { Types } from "../entities/place.entity";
import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AddressDto } from "./address.dto";

export class CreatePlaceDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()  
  whatsappContact: string;
  imageUrl: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}