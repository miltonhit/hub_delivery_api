import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";

export class AddressDto {
  @IsNotEmpty()
  zipcode: number;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  number: string;
  complement: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  @Length(2, 2)
  state: string;
  @IsNotEmpty()
  district: string;
  @IsNotEmpty()
  lat: number;
  @IsNotEmpty()
  lng: number;
}