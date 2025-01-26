import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";
import { SignupDto } from "./dtos/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  async signUp(user: SignupDto) {
    const createdUser = await this.userService.create(user);
    const payload = {
      userId: createdUser._id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }
}
