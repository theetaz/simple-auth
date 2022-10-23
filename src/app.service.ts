import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): any {
    return { message: "Welcome to the simple auth backend application 1.0v" };
  }
}
