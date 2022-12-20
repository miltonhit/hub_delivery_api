import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";
import { Option } from "./option";

export class OneChoiceOption {
  title: string;
  options: Option[];
}