import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo-dto';
import { Todo } from 'src/interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'NestJs',
      description: 'Installer NestJs',
      done: true,
    },
    {
      id: 2,
      title: 'Pain',
      description: 'Acheter du pain',
      done: false,
    },
    {
      id: 3,
      title: 'Wine',
      description: 'Acheter du vin',
      done: false,
    },
  ]

  getAll(): Todo[] {
    return this.todos;
  }

  get(id: string): Todo {
    return this.todos.find(todo => todo.id === Number(id));
  }

  create(todo: CreateTodoDto): void {
    this.todos = [...this.todos, todo];
  } 

  update(id: string, todo: CreateTodoDto): void {
    const todoToUpdate = this.todos.find(todo => todo.id === +id);
    if(!todoToUpdate) {
      throw new NotFoundException('Todo not exist');
    }
    if(todo.hasOwnProperty('done')){
      todoToUpdate.done = todo.done;
    }
    if(todo.title){
      todoToUpdate.title = todo.title;
    }
    if(todo.description){
      todoToUpdate.description = todo.description;
    }
    const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate)
    this.todos = [...updatedTodos];
  }

  delete(id: string): void {
    this.todos = [...this.todos.filter(t => t.id !== +id)];
  }
}
