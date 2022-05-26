import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(public todoService: TodoService, private formBuilder: FormBuilder) {}

  todoForm = this.formBuilder.group({
    label: ''
  })

  async onSubmit(): Promise<void> {
    const label = this.todoForm.value.label
    await this.todoService.addTodo(label);
    this.todoForm.patchValue({
      label: ''
    })
  }

  async onDelete(todo: Todo): Promise<void> {
    await this.todoService.deleteTodo(todo.id)
  }

  ngOnInit(): void {
    this.todoService.initializeTodos();
  }
}
