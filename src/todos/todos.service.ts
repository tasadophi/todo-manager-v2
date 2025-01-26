import { Model, ObjectId } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./schemas/todo.schema";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dtp";

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(userId: ObjectId): Promise<Todo[]> {
    return this.todoModel.find({ user: userId }).exec();
  }

  async create(params: CreateTodoDto, userId: ObjectId): Promise<Todo> {
    const createdTodo = await this.todoModel.create({
      ...params,
      user: userId,
      isDone: false,
      isFavorite: false,
    });
    return createdTodo;
  }

  async getOne(todoId: string, userId: ObjectId) {
    const todo = await this.todoModel.findOne({ _id: todoId, user: userId });
    if (!todo) {
      throw new HttpException("todo not found", HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async updateOne(todoId: string, userId: ObjectId, params: UpdateTodoDto) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: todoId, user: userId },
      params,
      {
        new: true,
      }
    );
    if (!todo) {
      throw new HttpException("todo not found", HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async deleteOne(todoId: string, userId: ObjectId) {
    const todo = await this.todoModel.findOneAndDelete({
      _id: todoId,
      user: userId,
    });
    if (!todo) {
      throw new HttpException("todo not found", HttpStatus.NOT_FOUND);
    }
    return todo;
  }
}
