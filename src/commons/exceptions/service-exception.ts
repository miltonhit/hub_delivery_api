import { HttpException } from "@nestjs/common";
import { ErrorDef } from "./error-def.entity";

export class ServiceException extends Error {
  errorDef: ErrorDef;
  description?: string;

  public constructor(init?:Partial<ServiceException>) {
    super();
    Object.assign(this, init);
  }
}