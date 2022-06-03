import { createAction, props } from "@ngrx/store";
import { Item } from "./domain.model";

export const onInitialize = createAction(
  '[Domain] onInitialize collection',
  props<{ collection: string }>()
);
export const initialized = createAction(
  '[Domain] initialized collection',
  props<{ collection: string, items: Item<any>[] }>()
);

export const onCreate = createAction(
  '[Domain] onCreate item',
  props<{ collection: string, item: Item<any> }>()
);
export const added = createAction(
  '[Domain] added item',
  props<{ collection: string, item: Item<any> }>()
);

export const onUpdate = createAction(
  '[Domain] onUpdate item',
  props<{ collection: string, item: Item<any> }>()
);
export const updated = createAction(
  '[Domain] updated item',
  props<{ collection: string, item: Item<any> }>()
);

export const onDelete = createAction(
  '[Domain] onDelete item',
  props<{ collection: string, item: Item<any> }>()
);
export const deleted = createAction(
  '[Domain] deleted item',
  props<{ collection: string, itemId: string }>()
);