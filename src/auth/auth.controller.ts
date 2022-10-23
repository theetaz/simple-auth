import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import { RegisterDto, LoginDto } from "../auth/dto/auth.dto";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { Request, response } from "express";
import { HttpResponseService } from "src/common/http-response.service";

@Controller("authenticate")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpResponseService: HttpResponseService
  ) {}

  @Post("register")
  async register(
    @Body() body: RegisterDto,
    @Res() response
  ): Promise<User | never> {
    try {
      const result = await this.authService.register(body);
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result
          )
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null
          )
        );
    }
  }

  @Post("login")
  async login(@Body() body: LoginDto, @Res() response): Promise<any> {
    try {
      const result = await this.authService.login(body);
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result
          )
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null
          )
        );
    }
  }

  @Post("refresh")
  @UseGuards(JwtAuthGuard)
  async refresh(
    @Req() { user }: Request,
    @Res() response
  ): Promise<string | never> {
    try {
      const result = await this.authService.refresh(<User>user);
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result
          )
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null
          )
        );
    }
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getAuthenticatedUser(
    @Req() { user }: Request,
    @Res() response
  ): Promise<string | never> {
    try {
      const result = await this.authService.authenticatedUser(<User>user);
      return response
        .status(HttpStatus.OK)
        .json(
          this.httpResponseService.send(
            this.httpResponseService.SUCCESS,
            HttpStatus.OK,
            result
          )
        );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(
          this.httpResponseService.send(
            error.message || this.httpResponseService.ERROR,
            HttpStatus.BAD_REQUEST,
            null
          )
        );
    }
  }
}
