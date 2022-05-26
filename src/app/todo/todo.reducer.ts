import { createFeature, createReducer, on } from '@ngrx/store';
import * as Actions from './todo.actions';
import { Todo } from './todo.model';

type State = {
  list: Todo[];
};

const initialState: State = {
  list: [],
};

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    on(Actions.loaded, (state, { list }) => ({
      ...state,
      list,
    })),
    on(Actions.added, (state, { id, label }) => ({
      ...state,
      list: [
        ...state.list,
        {
          id,
          label,
          checked: false,
        },
      ],
    })),
    on(Actions.modified, (state, { id, label }) => ({
      ...state,
      list: state.list.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              label,
            }
          : todo
      ),
    })),
    on(Actions.toggled, (state, { id }) => ({
      ...state,
      list: state.list.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              checked: !todo.checked,
            }
          : todo
      ),
    })),
    on(Actions.deleted, (state, { id }) => ({
      ...state,
      list: state.list.filter((todo) => todo.id !== id),
    }))
  ),
});
