import { Injectable } from "@angular/core";
import { createSelector, Store } from "@ngrx/store";
import { failed, initialize, started, succeeded } from "./fetch.actions";

@Injectable()
export class FetchService {
  constructor(private store: Store) {}

  async fetch<T>(id: string, fetcher: () => Promise<T>) {
    this.store.dispatch(initialize({ id }));
    this.store.dispatch(started({ id, date: new Date() }));

    try {
      const result = await fetcher();
      this.store.dispatch(succeeded({ id, date: new Date(), result }));
      return result;
      return result;
    } catch (error) {
      this.store.dispatch(failed({ id, date: new Date(), error }));
    }
  }
}
