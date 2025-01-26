import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { User } from "@/users/schemas/user.schema";
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

export interface IGetUser extends Omit<User, "password"> {
  _id: ObjectId;
  email: string;
}
