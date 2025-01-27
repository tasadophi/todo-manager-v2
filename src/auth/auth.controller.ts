import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dtos/signup.dto";
import { SigninDto } from "@/auth/dtos/signin.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signUp(
    @Body() user: SignupDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.signUp(user);
    response.cookie("refresh", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: "user signedUp successfully!",
      data: { accessToken },
    };
  }

  @Post("signin")
  async signIn(
    @Body() user: SigninDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(user);
    response.cookie("refresh", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: "user signedIn successfully!",
      data: { accessToken },
    };
  }
}
