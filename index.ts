const isAction = <T>(action: Action<T>): action is ActionSetter<T> =>
	typeof action === 'function';
import { useSyncExternalStore } from 'react';

class Store<T> implements QuarkStore<T> {
	private value: T;
	private listeners: Set<Callback> = new Set();
	private initialValue: T;

	constructor(defaultValue: T) {
		this.value = defaultValue;
		this.initialValue = defaultValue;
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

		for (const cb of this.listeners) {
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

/**
 *
 * @param {Store<T>} $store
 * @returns {T}
 */
export const useStore = <T>($store: Store<T>): T => {
	const value: T = useSyncExternalStore<T>(
		$store.subscribe.bind($store),
		$store.get.bind($store),
		$store.get.bind($store)
	);
	return value as T;
};

export const createStore = <T>(defaultValue: T): Store<T> => {
	return new Store(defaultValue);
};
