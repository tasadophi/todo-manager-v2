import { Module } from "@nestjs/common";
import { TodosController } from "./todos.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "@/todos/todo.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
})
export class TodosModule {}
