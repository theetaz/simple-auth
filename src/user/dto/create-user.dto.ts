import { IsNotEmpty, Validate } from "class-validator";
import { Unique } from "src/validators/unique";
import { User } from "../entity/user.entity";
export class CreateUserDto {
  @IsNotEmpty({ message: "Username can not be empty" })
  @Validate(Unique, [User])
  username: string;

  @IsNotEmpty({ message: "Name can not be empty" })
  name: string;

  @IsNotEmpty({ message: "Email can not be empty" })
  @Validate(Unique, [User])
  email: string;

  @IsNotEmpty({ message: "Password can not be empty" })
  password: string;
}
