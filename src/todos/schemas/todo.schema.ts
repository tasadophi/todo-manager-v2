import { User } from "@/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false, timestamps: true })
export class Todo {
  @Prop({ required: [true, "title is required !"] })
  title: string;

  @Prop({ required: [true, "description is required !"] })
  description: string;

  @Prop()
  isDone: boolean;

  @Prop()
  isFavorite: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
