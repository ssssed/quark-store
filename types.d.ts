type Callback = () => void;
type Setter<T> = (value: T) => void;
type Getter<T> = () => T
type Action<T> = T | ActionSetter<T>
type ActionSetter<T> = (value: T) => T


interface QuarkStore<T> {
    get(): T
    set(action: Action<T> | Setter<T>): void
    clear(): void
    subscribe(cb: Callback): Callback
}