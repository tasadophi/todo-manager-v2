import { Model, ObjectId, Query } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { Todo } from "./schemas/todo.schema";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dtp";

const disallowedSearchFields = [
  "_id",
  "createdAt",
  "updatedAt",
  "password",
  "page",
  "limit",
  "startDate",
  "endDate",
  "user",
];

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async searchByFields(
    todosQuery: Query<Todo[], Todo>,
    queryString: Request["query"]
  ) {
    // search on boolean and string fields
    const fields: Record<string, unknown> = {};
    const booleanFilters: Record<string, boolean>[] = [];
    Object.keys(queryString).forEach((key) => {
      if (!disallowedSearchFields.includes(key)) {
        fields[key] = queryString[key];
      }
    });
    const strFilters: Record<
      string,
      {
        $regex: string;
        $options: string;
      }
    >[] = [];
    Object.keys(fields).forEach((key) => {
      if (["false", "true"].includes(fields[key] as string)) {
        booleanFilters.push({
          [key]: fields[key] === "false" ? false : true,
        });
      } else {
        strFilters.push({
          [key]: {
            $regex: fields[key] ? ".*" + fields[key] + ".*" : "",
            $options: "i",
          },
        });
      }
    });
    if (booleanFilters.length)
      todosQuery = todosQuery.find({
        $and: booleanFilters,
      });
    if (strFilters.length)
      todosQuery = todosQuery.find({
        $or: strFilters,
      });
    return todosQuery;
  }

  findAll(userId: ObjectId): Query<Todo[], Todo> {
    return this.todoModel.find({ user: userId });
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
