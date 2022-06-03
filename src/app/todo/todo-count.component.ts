import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { createCollectionSelector } from '../shared/domain.feature';

@Component({
  selector: 'todo-count',
  templateUrl: './todo-count.component.html',
  styleUrls: ['./todo-count.component.css']
})
export class TodoCountComponent implements OnInit {

  constructor(private store: Store) { }

  count$ = this.store.select(createCollectionSelector('TODOS')).pipe(map(todos => todos.length))

  ngOnInit(): void {
  }

}
