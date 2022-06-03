export type Item<V = any> = {
    id: string
    value: V
}

export type Collection<V> = {
    name: string
    items: Item<V>[]
}