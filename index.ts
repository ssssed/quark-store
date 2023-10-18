import { Store } from './lib/store'

export const createStore = <T>(defaultValue: T): Store<T> => {
    const store = new Store(defaultValue);
    return store;
}