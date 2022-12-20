import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";
import { OptionDto } from "./option.dto";

export class OneChoiceOptionDto {
  title: string;
  options: OptionDto[];
}