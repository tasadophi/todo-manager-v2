import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: [true, "email is required !"] })
  email: string;

  @Prop({ default: "Dear User !" })
  name: string;

  @Prop({ required: [true, "password is required !"] })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
