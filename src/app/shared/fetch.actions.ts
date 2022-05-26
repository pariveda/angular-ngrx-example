import { createAction, props } from '@ngrx/store';

export const initialize = createAction(
  '[Fetch] initialized',
  props<{ id: string }>()
);

export const started = createAction(
  '[Fetch] started',
  props<{ id: string; date: Date }>()
);

export const succeeded = createAction(
  '[Fetch] succeeded',
  props<{ id: string; date: Date; result: any }>()
);

export const failed = createAction(
  '[Fetch] failed',
  props<{ id: string; date: Date; error: any }>()
);
