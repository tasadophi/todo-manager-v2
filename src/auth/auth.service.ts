import { Injectable } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { SignupDto } from "./dtos/signup.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(user: SignupDto) {
    const createdUser = await this.userService.create(user);
    return createdUser;
  }
}
