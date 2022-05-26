import { Injectable } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { fetchFeature } from './shared/fetch.reducer';
import { FetchService } from './shared/fetch.service';
import { added, deleted, loaded, modified, toggled } from './todo/todo.actions';
import { Todo } from './todo/todo.model';
import { todoFeature } from './todo/todo.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private fetchService: FetchService, private store: Store) { }

  list$ = this.store.select(todoFeature.selectList)
  loading$ = this.store.select(createSelector(fetchFeature.selectItems, items => {
    return items.find(i => i.id.startsWith('TODO_') && i.status === 'LOADING')
  }))

  async initializeTodos() {
    async function mock_fetch(): Promise<Todo[]> {
      return new Promise((res) =>
        setTimeout(() => {
          res([
            {
              id: new Date('2022-05-01').toISOString(),
              checked: false,
              label: 'hello'
            },
            {
              id: new Date('2022-05-02').toISOString(),
              checked: false,
              label: 'world'
            }
          ]);
        }, 200)
      );
    }

    const todoList = await this.fetchService.fetch('TODO_INITIALIZE', mock_fetch);
    this.store.dispatch(loaded({ list: todoList }));
    return todoList;
  }

  async addTodo(label: string) {
    const mock_fetch = () => new Promise(resolve => setTimeout(resolve, 200));

    await this.fetchService.fetch('TODO_ADD', mock_fetch);
    this.store.dispatch(added({ id: new Date().toISOString(), label }))
  }

  async toggleTodo(id: string) {
    const mock_fetch = () => new Promise(resolve => setTimeout(resolve, 200));

    await this.fetchService.fetch('TODO_TOGGLE', mock_fetch);
    this.store.dispatch(toggled({ id }));
  }

  async modifyTodo(id: string, label: string) {
    const mock_fetch = () => new Promise(resolve => setTimeout(resolve, 200));

    await this.fetchService.fetch('TODO_MODIFY', mock_fetch);
    this.store.dispatch(modified({ id, label }));
  }

  async deleteTodo(id: string) {
    const mock_fetch = () => new Promise(resolve => setTimeout(resolve, 200));

    await this.fetchService.fetch('TODO_DELETE', mock_fetch);
    this.store.dispatch(deleted({ id }));
  }
}
