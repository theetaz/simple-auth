import { Trim } from "class-sanitizer";
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from "class-validator";
import { Unique } from "src/validators/unique";
import { User } from "src/user/entity/user.entity";
export class RegisterDto {
  @Trim()
  @IsEmail()
  @Validate(Unique, [User])
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
