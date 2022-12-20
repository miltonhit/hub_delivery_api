import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";
import { MultipleChoiceOptionsDto } from "./multiple-choice.dto";
import { OneChoiceOptionDto } from "./one-choice-option.dto";

export class MenuSectionItemDto {
  id: string;
  placeId: string;
  sectionId: string;
  title: string;
  description: string;
  value: number;
  imageUrl: string;
  oneChoiceOptions: OneChoiceOptionDto[];
  multipleChoiceOptions: MultipleChoiceOptionsDto[];
}