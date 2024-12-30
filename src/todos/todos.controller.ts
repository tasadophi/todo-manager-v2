import { TodosService } from "@/todos/todos.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
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

  @Post("/create")
  async createTodo(@Body() body: CreateTodoDto) {
    const todo = await this.todosService.create(body);
    return {
      message: "todo created successfully!",
      data: todo,
    };
  }
}
