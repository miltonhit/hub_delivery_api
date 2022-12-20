import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";

export class Option {
  title: string;
  description: string;
  value: number;
}