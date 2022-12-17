import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailDto {
  @IsEmail()
  @IsNotEmpty()
  new: string;
  token: string;
}