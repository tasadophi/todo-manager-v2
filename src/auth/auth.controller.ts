import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request as ExpressRequest, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignupDto } from "./dtos/signup.dto";
import { SigninDto } from "./dtos/signin.dto";
import { GetUser, IGetUser } from "@/users/user.decorator";

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

  @Post("refresh")
  async refresh(@Request() req: ExpressRequest) {
    const { accessToken } = await this.authService.refresh(req);
    return {
      message: "token refreshed successfully!",
      data: { accessToken },
    };
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async me(@GetUser() user: IGetUser) {
    return {
      message: "user received successfully!",
      user,
    };
  }
}
