import { Store } from './lib/store'

export const createStore = <T>(defaultValue: T): Store<T> => {
    return new Store(defaultValue);
}