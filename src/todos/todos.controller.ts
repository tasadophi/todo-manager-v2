import { TodosService } from "@/todos/todos.service";
import { Controller, Get } from "@nestjs/common";

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
}
