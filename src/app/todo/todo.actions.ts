import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const loaded = createAction('[Todo] loaded', props<{ list: Todo[] }>());

export const added = createAction(
  '[Todo] added',
  props<{ id: string; label: string }>()
);

export const modified = createAction(
  '[Todo] modified',
  props<{ id: string; label: string }>()
);

export const toggled = createAction('[Todo] toggled', props<{ id: string }>());

export const deleted = createAction('[Todo] deleted', props<{ id: string }>());
