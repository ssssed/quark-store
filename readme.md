# Quark Store

A tiny state manager for **React**.
It uses **many quark stores** and direct manipulation.

**Small.** Between 216 bytes (minified and gzipped).
  Zero dependencies. It uses [Size Limit] to control size.
* **Fast.** With small createStoreic and derived stores, you do not need to call
  the selector function for all components on every store change.
* **Tree Shakable.** A chunk contains only stores used by components
  in the chunk.
* Designed to move logic from components to stores.
* Good **TypeScript** support.

```ts
// store/todos.ts
import { createStore } from 'quark-store';

export const $todos = createStore<Todo[]>([]);

export function addTodo(todo: Todo) {
  $todos.set([...$todos.get(), todo]);
}
```

```ts
import { createStore, useStore } from 'quark-store';

const $todos = createStore<Todo[]>([]);

export const Todos = () => {

    return (
        <>
            <div>
            {
                todos.map((todo) => <div key={todo.id}>{todo.label}</div>)
            }
            </div>
        </>
    )
}
```

[Size Limit]: https://github.com/ai/size-limit
