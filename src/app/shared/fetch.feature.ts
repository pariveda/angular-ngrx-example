import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
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
    on(Actions.initialize, (state, { collection, id }) => ({
      ...state,
      items: [
        ...state.items,
        {
          collection,
          id,
          status: 'IDLE',
        },
      ],
    })),
    on(Actions.started, (state, { collection, id, date }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.collection === collection && fetch.id === id
          ? {
              ...fetch,
              status: 'LOADING',
              startedOn: date,
            }
          : fetch
      ),
    })),
    on(Actions.succeeded, (state, { collection, id, date, result }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.collection === collection && fetch.id === id && fetch.status === 'LOADING'
          ? {
              ...fetch,
              status: 'SUCCEEDED',
              result,
              completedOn: date,
            }
          : fetch
      ),
    })),
    on(Actions.failed, (state, { collection, id, date, error }) => ({
      ...state,
      items: state.items.map((fetch) =>
        fetch.collection === collection && fetch.id === id && fetch.status === 'LOADING'
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

export const createFetchSelector = (name: string, id?: string) => createSelector(fetchFeature.selectItems, items => !!items.find(item => item.collection === name && (!id || item.id === id) && item.status === 'LOADING'))