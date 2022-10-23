import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): any {
    return { message: "Welcome to the kingsfund dex platform version 1.0v" };
  }
}
