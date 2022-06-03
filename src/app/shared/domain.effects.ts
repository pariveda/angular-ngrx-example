import { Injectable } from "@angular/core";
import * as DomainActions from './domain.actions';
import * as FetchActions from './fetch.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, endWith, map, mergeMap, Observable, startWith } from "rxjs";
import { DomainService } from "./domain.service";

@Injectable()
export class DomainEffects {
    initialize$ = createEffect(() => this.action$.pipe(
        ofType(DomainActions.onInitialize),
        mergeMap((action) => this.domainService.initialize(action.collection).pipe(
            mergeMap(items => [
                DomainActions.initialized({
                    collection: action.collection,
                    items
                }),
                FetchActions.succeeded({ collection: action.collection, id: 'INITIALIZE', result: items, date: new Date() }),
            ]),
            startWith(
                FetchActions.initialize({ collection: action.collection, id: 'INITIALIZE' }),
                FetchActions.started({ collection: action.collection, id: 'INITIALIZE', date: new Date() }),
            ),
            catchError(() => EMPTY)
        ))
    ))

    create$ = createEffect(() => this.action$.pipe(
        ofType(DomainActions.onCreate),
        mergeMap((action) => this.domainService.create(action.collection, action.item).pipe(
            mergeMap(item => [
                DomainActions.added({
                    collection: action.collection,
                    item
                }),
                FetchActions.succeeded({ collection: action.collection, id: `CREATE_${action.item.id}`, result: item, date: new Date() }),
            ]),
            startWith(
                FetchActions.initialize({ collection: action.collection, id: `CREATE_${action.item.id}` }),
                FetchActions.started({ collection: action.collection, id: `CREATE_${action.item.id}`, date: new Date() })
            ),
            catchError(() => EMPTY)
        ))
    ))

    update$ = createEffect(() => this.action$.pipe(
        ofType(DomainActions.onUpdate),
        mergeMap((action) => this.domainService.update(action.collection, action.item).pipe(
            mergeMap(item => [
                DomainActions.updated({
                    collection: action.collection,
                    item
                }),
                FetchActions.succeeded({ collection: action.collection, id: `UPDATE_${action.item.id}`, result: item, date: new Date() }),
            ]),
            startWith(
                FetchActions.initialize({ collection: action.collection, id: `UPDATE_${action.item.id}` }),
                FetchActions.started({ collection: action.collection, id: `UPDATE_${action.item.id}`, date: new Date() })
            ),
            catchError(() => EMPTY)
        ))
    ))

    onDelete$ = createEffect(() => this.action$.pipe(
        ofType(DomainActions.onDelete),
        mergeMap((action) => this.domainService.delete(action.collection, action.item).pipe(
            mergeMap(result => [
                DomainActions.deleted({
                    collection: action.collection,
                    itemId: action.item.id
                }),
                FetchActions.succeeded({ collection: action.collection, id: `DELETE_${action.item.id}`, result: result, date: new Date() }),
            ]),
            startWith(
                FetchActions.initialize({ collection: action.collection, id: `DELETE_${action.item.id}` }),
                FetchActions.started({ collection: action.collection, id: `DELETE_${action.item.id}`, date: new Date() }),
            ),
            catchError(() => EMPTY)
        ))
    ))

    constructor(
        private action$: Actions,
        private domainService: DomainService
    ) {

    }
}