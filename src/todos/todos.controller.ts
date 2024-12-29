import { Controller, Get } from "@nestjs/common";

@Controller("todos")
export class TodosController {
  @Get("/")
  getTodos() {
    const todos = [
      { id: 1, title: "Todo 1", description: "just a description for todo 1" },
    ];
    return {
      message: "todos received successfully!",
      data: todos,
    };
  }
}
