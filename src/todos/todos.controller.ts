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
  UseGuards,
} from "@nestjs/common";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dtp";
import { AuthGuard } from "@/auth/auth.guard";
import { GetUser, IGetUser } from "@/users/user.decorator";

@UseGuards(AuthGuard)
@Controller("todos")
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get("/")
  async getTodos(@GetUser() user: IGetUser) {
    const todos = await this.todosService.findAll(user._id);
    return {
      message: "todos received successfully!",
      data: todos,
    };
  }

  @Post("/")
  async createTodo(@Body() body: CreateTodoDto, @GetUser() user: IGetUser) {
    const todo = await this.todosService.create(body, user._id);
    return {
      message: "todo created successfully!",
      data: todo,
    };
  }

  @Get("/:id")
  async getTodo(@Param("id") todoId: string, @GetUser() user: IGetUser) {
    const todo = await this.todosService.getOne(todoId, user._id);
    return {
      message: "todo received successfully!",
      data: todo,
    };
  }

  @Put("/:id")
  async updateTodo(
    @Param("id") todoId: string,
    @Body() body: UpdateTodoDto,
    @GetUser() user: IGetUser
  ) {
    const todo = await this.todosService.updateOne(todoId, user._id, body);
    return {
      message: "todo updated successfully!",
      data: todo,
    };
  }

  @Delete("/:id")
  @HttpCode(204)
  async deleteTodo(@Param("id") todoId: string, @GetUser() user: IGetUser) {
    await this.todosService.deleteOne(todoId, user._id);
  }
}
