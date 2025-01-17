import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "@/users/schemas/user.schema";
import { SignupDto } from "@/auth/dtos/signup.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: SignupDto) {
    const { email } = user;
    const foundUser = await this.userModel.findOne({ email });
    if (foundUser) {
      throw new HttpException("user already exists", HttpStatus.BAD_REQUEST);
    }
    const createdUser = await this.userModel.create(user);
    return this.sanitizeUser(createdUser);
  }

  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized["password"];
    return sanitized;
  }
}
