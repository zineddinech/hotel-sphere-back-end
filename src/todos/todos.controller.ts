import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from 'src/interfaces/todo.interface';
import { CreateTodoDto } from 'src/dto/create-todo-dto';

// localhost:3000/todos
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  getAll(): Todo[] {
    return this.todosService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.todosService.get(id);
  }

  @Post()
  create(@Body() newTodo: CreateTodoDto): void {
    this.todosService.create(newTodo); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: CreateTodoDto): void {
    try{
      this.todosService.update(id,todo);
    }catch(err) {
      return err;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.todosService.delete(id); 
  }
}
 