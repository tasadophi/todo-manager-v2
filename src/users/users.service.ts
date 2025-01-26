import { Model, ObjectId } from "mongoose";
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

  async findById(id: ObjectId) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }

    return this.sanitizeUser(user);
  }

  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized["password"];
    return sanitized;
  }
}
