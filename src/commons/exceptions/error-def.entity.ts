export class ErrorDef {
  public constructor(init?:Partial<ErrorDef>) {
    Object.assign(this, init);
  }

  type: ErrorsType;
  code: number;
  description: string;
  customHttpCode?: number;
}

export enum ErrorsType {
  LOGIC,        // Logical errors i.e business rules, conflicts, etc.
  VALIDATION,   // Validation erros: i.e bad arguments etc. 
  FATAL         // Fatal erros i.e integration erros etc.
}

export const ErrorsConst = {
  alreadyExists: new ErrorDef({code: 1, description: "alreadyExists", type: ErrorsType.LOGIC}),
  invalidInput: new ErrorDef({code: 2, description: "invalidInput", type: ErrorsType.LOGIC})
}