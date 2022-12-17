import { IsNotEmpty, Length } from "class-validator";

export class UpdatePasswordDto {
  @Length(6, 32)
  @IsNotEmpty()
  new: string;

  @IsNotEmpty()
  old: string;
}