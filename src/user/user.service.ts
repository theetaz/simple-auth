import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  createUser = async (user: CreateUserDto) => {
    const SALT_ROUND = 10;
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const response = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...clearUser } = response;
    return clearUser;
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ email: email });
  };

  getUSerById = async (id: number) => {
    return await this.userRepository.findOne({ id: id });
  };
}
