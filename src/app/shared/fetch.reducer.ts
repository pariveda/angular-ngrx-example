import { createFeature, createReducer, on } from '@ngrx/store';
import * as Actions from './fetch.actions';
import { FetchItem } from './fetch.model';

type State = {
  items: FetchItem[];
};

const initialState: State = {
  items: [],
};

export const fetchFeature = createFeature({
  name: 'fetch',
  reducer: createReducer(
    initialState,
    on(Actions.initialize, (state, { id }) => ({
      ...state,
      items: [
        ...state.items,
        {
          id,
          status: 'IDLE',
        },
      ],
    })),
    on(Actions.started, (state, { id, date }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.id === id
          ? {
              ...fetch,
              status: 'LOADING',
              startedOn: date,
            }
          : fetch
      ),
    })),
    on(Actions.succeeded, (state, { id, date, result }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.id === id && fetch.status === 'LOADING'
          ? {
              ...fetch,
              status: 'SUCCEEDED',
              result,
              completedOn: date,
            }
          : fetch
      ),
    })),
    on(Actions.failed, (state, { id, date, error }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.id === id && fetch.status === 'LOADING'
          ? {
              ...fetch,
              status: 'FAILED',
              error,
              completedOn: date,
            }
          : fetch
      ),
    }))
  ),
});
