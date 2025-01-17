import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() user: SignupDto) {
    const signedUpUser = await this.authService.signUp(user);
    return {
      message: "user signedUp successfully!",
      data: signedUpUser,
    };
  }
}
