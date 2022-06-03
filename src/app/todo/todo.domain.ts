import { delay, Observable, of } from "rxjs";
import { Item } from "../shared/domain.model";
import { DomainHandler } from "../shared/domain.service";
import { Todo } from "./todo.model";

const mockTodo = (todo: Todo): Item<Todo> => ({
    id: todo.id,
    value: todo
})

export class TodoDomainHandler extends DomainHandler<Todo> {
    initialize(): Observable<Item<Todo>[]> {
        return of([
            mockTodo({
                id: new Date().toISOString(),
                label: 'Hello',
                checked: false
            }),
        ]).pipe(delay(400))
    }
    create(item: Item<Todo>): Observable<Item<Todo>> {
        return of({
            ...item,
            value: {
                ...item.value,
                id: new Date().toISOString(),
            },
            id: new Date().toISOString(),
        }).pipe(delay(400))
    }
    update(item: Item<Todo>): Observable<Item<Todo>> {
        return of(item).pipe(delay(400))
    }
    delete(item: Item<Todo>): Observable<any> {
        return of(item).pipe(delay(400))
    }
    public type = 'TODOS';
}