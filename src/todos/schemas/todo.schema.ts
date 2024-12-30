import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ versionKey: false })
export class Todo {
  @Prop({ required: [true, "title is required !"] })
  title: string;

  @Prop({ required: [true, "description is required !"] })
  description: string;

  @Prop()
  isDone: boolean;

  @Prop()
  isFavorite: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
