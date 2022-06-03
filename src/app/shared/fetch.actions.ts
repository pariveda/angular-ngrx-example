import { createAction, props } from '@ngrx/store';

export const initialize = createAction(
  '[Fetch] initialized',
  props<{ collection: string, id: string; }>()
);

export const started = createAction(
  '[Fetch] started',
  props<{ collection: string, id: string; date: Date }>()
);

export const succeeded = createAction(
  '[Fetch] succeeded',
  props<{ collection: string; id: string; date: Date; result: any }>()
);

export const failed = createAction(
  '[Fetch] failed',
  props<{ collection: string; id: string; date: Date; error: any }>()
);
