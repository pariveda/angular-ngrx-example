import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { onCreate, onDelete, onInitialize } from '../shared/domain.actions';
import { createCollectionSelector } from '../shared/domain.feature';
import { createFetchSelector } from '../shared/fetch.feature';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  loading$ = this.store.select(createFetchSelector('TODOS'))
  list$ = this.store.select(createCollectionSelector('TODOS'))

  todoForm = this.formBuilder.group({
    label: ''
  })

  async onSubmit(): Promise<void> {
    const label = this.todoForm.value.label
    this.store.dispatch(onCreate({
      collection: 'TODOS',
      item: {
        id: '',
        value: {
          label
        }
      }
    }))
    this.todoForm.patchValue({
      label: ''
    })
  }

  async onDelete(todo: Todo): Promise<void> {
    this.store.dispatch(onDelete({
      collection: 'TODOS',
      item: {
        id: todo.id,
        value: todo
      }
    }))
  }

  ngOnInit(): void {
    this.store.dispatch(onInitialize({
      collection: 'TODOS',
    }))
  }
}
