import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";

export class OptionDto {
  title: string;
  description: string;
  value: number;
}