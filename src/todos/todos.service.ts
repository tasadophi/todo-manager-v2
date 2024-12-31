import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./schemas/todo.schema";
import { CreateTodoDto } from "./dtos/createTodo.dto";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async create(params: CreateTodoDto): Promise<Todo> {
    const createdTodo = this.todoModel.create({
      ...params,
      isDone: false,
      isFavorite: false,
    });
    return createdTodo;
  }

  async getOne(todoId: string) {
    return this.todoModel.findOne({ _id: todoId });
  }

  async deleteOne(todoId: string) {
    return this.todoModel.deleteOne({ _id: todoId });
  }
}
