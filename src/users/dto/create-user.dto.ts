import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 32)
  @IsNotEmpty()
  password: string;
}