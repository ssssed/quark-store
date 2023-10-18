const isAction = <T>(action: Action<T>): action is ActionSetter<T> => typeof action === 'function'

export class Store<T> implements QuarkStore<T> {

    private value: T;
    private listeners: Set<Callback> = new Set();
    private initialValue: T;

    constructor(defaultValue: T) {
        this.value = defaultValue;
        this.initialValue = defaultValue;
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.clear = this.clear.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    get(): T {
        return this.value;
    }

    set(action: Action<T>): void {
        if (isAction(action)) {
            this.value = action(this.value);
        } else {
            this.value = action;
        }
        
        for(const cb of this.listeners) {
            cb();
        }
    }

    clear(): void {
        this.set(this.initialValue);
    }

    subscribe(cb: Callback): Callback {
        this.listeners.add(cb);
        return () => {
            this.listeners.delete(cb);
        };
    }
}


