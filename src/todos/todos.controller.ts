import { TodosService } from "@/todos/todos.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from "@nestjs/common";
import { CreateTodoDto } from "./dtos/createTodo.dto";

@Controller("todos")
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get("/")
  async getTodos() {
    const todos = await this.todosService.findAll();
    return {
      message: "todos received successfully!",
      data: todos,
    };
  }

  @Post("/")
  async createTodo(@Body() body: CreateTodoDto) {
    const todo = await this.todosService.create(body);
    return {
      message: "todo created successfully!",
      data: todo,
    };
  }

  @Get("/:id")
  async getTodo(@Param("id") todoId: string) {
    const todo = await this.todosService.getOne(todoId);
    return {
      message: "todo received successfully!",
      data: todo,
    };
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteTodo(@Param("id") todoId: string) {
    await this.todosService.deleteOne(todoId);
  }
}
