import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "./domain.model";

export abstract class DomainHandler<T = any> {
    public abstract type: string
    abstract initialize(): Observable<Item<T>[]>
    abstract create(item: Item<T>): Observable<Item<T>>
    abstract update(item: Item<T>): Observable<Item<T>>
    abstract delete(item: Item<T>): Observable<any>
}

export class DefaultDomainHandler extends DomainHandler {
    initialize(): Observable<Item[]> {
        throw new Error("Method not implemented.");
    }
    create<T>(item: Item): Observable<Item> {
        throw new Error("Method not implemented.");
    }
    update<T>(item: Item): Observable<Item> {
        throw new Error("Method not implemented.");
    }
    delete<T>(item: Item): Observable<any> {
        throw new Error("Method not implemented.");
    }
    public type: string = 'default';
}


@Injectable()
export class DomainService {
    constructor(@Inject(DomainHandler) private domainHandlers: DomainHandler[]) {
        console.log(domainHandlers);
    }

    initialize<T>(collection: string): Observable<Item<T>[]> {
        const result = this.domainHandlerFor(collection).initialize();
        return result;
    }
    create<T>(collection: string, item: Item<T>): Observable<Item<T>> {
        const result = this.domainHandlerFor(collection).create(item);
        return result;
    }
    update<T>(collection: string, item: Item<T>): Observable<Item<T>> {
        const result = this.domainHandlerFor(collection).update(item);
        return result;
    }
    delete<T>(collection: string, item: Item<T>): Observable<any> {
        const result = this.domainHandlerFor(collection).delete(item);
        return result;
    }

    private domainHandlerFor(type: string) {
        const handler = this.domainHandlers.find(d => d.type === type);
        if (!handler) {
            throw new Error("Handler not implemented.");
        }
        return handler;
    }
}
