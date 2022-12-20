import { IsEmail, IsNotEmpty, Length, IsNotEmptyObject, IsObject } from "class-validator";
import { MenuSectionItem } from "./menu-section-item";

export class MenuSection {
  public constructor(init?:Partial<MenuSection>) {
    Object.assign(this, init);
  }

  id: string;
  placeId: string;
  title: string;
  itens: MenuSectionItem[];
}