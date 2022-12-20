import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";

export class MenuSectionDto {
  id: string;
  placeId: string;
  title: string;
}