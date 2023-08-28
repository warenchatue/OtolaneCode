import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createTodo(): void {
    const todo: Todo = {
      _id: '',
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      completed: false
    };

    this.todoService.createTodo(todo).subscribe(createdTodo => {
      this.todoForm.reset();
      window.location.reload();
    });

    
  }
}

