import { TodosService } from "@/todos/todos.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dtp";

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

  @Put("/:id")
  async updateTodo(@Param("id") todoId: string, @Body() body: UpdateTodoDto) {
    const todo = await this.todosService.updateOne(todoId, body);
    return {
      message: "todo updated successfully!",
      data: todo,
    };
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteTodo(@Param("id") todoId: string) {
    await this.todosService.deleteOne(todoId);
  }
}
