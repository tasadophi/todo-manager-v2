import { Module } from "@nestjs/common";
import { TodosController } from "./todos.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./schemas/todo.schema";
import { TodosService } from "./todos.service";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
