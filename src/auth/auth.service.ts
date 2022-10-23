import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { RegisterDto, LoginDto } from "./dto/auth.dto";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<any> {
    const hashedPassword = this.helper.encodePassword(body.password);
    const newUser = new User();
    newUser.email = body.email;
    newUser.password = hashedPassword;
    newUser.name = body.name;
    const response = await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...clearUser } = response;
    return clearUser;
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }

    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.userRepository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async authenticatedUser(user: User): Promise<any> {
    const userResponse = await this.userRepository.findOne({ id: user.id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userResponse;
    return rest;
  }
}
