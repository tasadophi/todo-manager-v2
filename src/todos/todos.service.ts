import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "@/todos/todo.schema";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }
}
