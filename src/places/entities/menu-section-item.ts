import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";
import { MultipleChoiceOptions } from "./multiple-choice";
import { OneChoiceOption } from "./one-choice-option";

export class MenuSectionItem {
  public constructor(init?:Partial<MenuSectionItem>) {
    Object.assign(this, init);
  }

  id: string;
  sectionId: string;
  title: string;
  description: string;
  value: number;
  imageUrl: string;
  oneChoiceOptions: OneChoiceOption[];
  multipleChoiceOptions: MultipleChoiceOptions[];
}