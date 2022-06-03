import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as Actions from './domain.actions';
import { Collection } from './domain.model';

type State = {
    collections: Collection<any>[]
};

const initialState: State = {
    collections: []
};

export const domainFeature = createFeature({
  name: 'domain',
  reducer: createReducer(
    initialState,
    on(Actions.initialized, (state, props) => ({
        collections: 
            state.collections.filter(c => c.name !== props.collection).concat({
                ...state.collections.find(c => c.name === props.collection),
                name: props.collection,
                items: props.items
            })
    })),
    on(Actions.added, (state, props) => ({
        collections: 
            state.collections.filter(c => c.name !== props.collection).concat({
                ...state.collections.find(c => c.name === props.collection),
                items: [
                    ...state.collections.find(c => c.name === props.collection)?.items,
                    props.item
                ]
            })
    })),
    on(Actions.updated, (state, props) => ({
        collections: 
            state.collections.filter(c => c.name !== props.collection).concat({
                ...state.collections.find(c => c.name === props.collection),
                items: [
                    ...state.collections.find(c => c.name === props.collection)?.items.filter(item => item.id !== props.item.id),
                    props.item
                ]
            })
    })),
    on(Actions.deleted, (state, props) => ({
        collections: 
            state.collections.filter(c => c.name !== props.collection).concat({
                ...state.collections.find(c => c.name === props.collection),
                items: 
                    state.collections.find(c => c.name === props.collection)?.items.filter(item => item.id !== props.itemId),
            })
    }))
  ),
});

export const createCollectionSelector = (name: string) => createSelector(domainFeature.selectCollections, collections => collections.find(c => c.name === name)?.items.map(i => i.value) ?? [])
