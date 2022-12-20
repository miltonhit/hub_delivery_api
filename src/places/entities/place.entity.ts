import { Address } from "./address.entity";
import { table, attribute, hashKey } from "@aws/dynamodb-data-mapper-annotations";
import { MenuSection } from "./menu-section";

// @table(`hub-users-${process.env.DB_TABLE_SUFFIX}`)
@table('hub-places-dev')
export class Place {
  public constructor(init?:Partial<Place>) {
    Object.assign(this, init);
  }

  @hashKey()
  id: string;
  @attribute()
  ownerId: string;
  @attribute()
  address: Address;
  @attribute()
  title: string;
  @attribute()
  imageUrl: string;
  @attribute()
  whatsappContact: string;
  @attribute()
  principal: Types;
  @attribute()
  secondary: Types;
  //
  //
  @attribute()
  monday   : OpeningHour[];
  @attribute()
  tuesday  : OpeningHour[];
  @attribute()
  wednesday: OpeningHour[];
  @attribute()
  thursday : OpeningHour[];
  @attribute()
  friday   : OpeningHour[];
  @attribute()
  saturday : OpeningHour[];
  @attribute()
  sunday   : OpeningHour[];
  //
  // I.g [2022-12-24, 2022-12-25, 2022-12-31, 2023-01-01]
  // To avoid orders in holidays for example.
  @attribute()
  overwriteClose: string[];
  @attribute()
  listed: boolean;

  @attribute()
  menuSections: MenuSection[];
}

export enum Types {
  PIZZA, LANCHE, JAPA, SAUDAVEL, MEXICANA, DOCE, ACAI, MARMITA
}

export class OpeningHour {
  start: number;
  end: number;
}