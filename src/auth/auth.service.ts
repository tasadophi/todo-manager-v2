import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "@/users/users.service";
import { SignupDto } from "./dtos/signup.dto";
import { SigninDto } from "@/auth/dtos/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateTokens(payload: Record<string, unknown>) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  }

  async signUp(user: SignupDto) {
    const createdUser = await this.userService.create(user);
    const payload = {
      userId: createdUser._id,
    };
    const tokens = this.generateTokens(payload);
    return tokens;
  }

  async signIn(userData: SigninDto) {
    const user = await this.userService.findByEmail(userData.email);

    if (!user) {
      throw new HttpException(
        "email or password incorrect",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      userData.password,
      user.password as string
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        "email or password incorrect",
        HttpStatus.UNAUTHORIZED
      );
    }
    const payload = {
      userId: user._id,
    };
    const tokens = this.generateTokens(payload);
    return tokens;
  }

  async refresh(req: Request) {
    if (!req.cookies.refresh) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    // Destructuring refresh from cookie
    const refreshToken = req.cookies.refresh;

    // Verifying refresh token
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findById(payload.userId);
      if (!user) {
        throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
      }
      const tokensPayload = {
        userId: user._id,
      };
      return this.generateTokens(tokensPayload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
