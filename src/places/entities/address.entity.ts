export class Address {
  public constructor(init?:Partial<Address>) {
    Object.assign(this, init);
  }

  id: string;
  zipcode: number;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  district: string;
  //
  // GoogleMaps
  completeByGeo: string;
  lat: number;
  lng: number;
  createdAt?: Date;
  updatedAt?: Date;
}