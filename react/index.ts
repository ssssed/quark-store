import {useSyncExternalStore} from 'react';


/**
 * 
 * @param {QuarkStore<T>} $store 
 * @returns {T}
 */
export const useStore = <T>($store: QuarkStore<T>): T => {
    const value: T = useSyncExternalStore<T>($store.subscribe.bind($store), $store.get.bind($store));
    return value as T;
}