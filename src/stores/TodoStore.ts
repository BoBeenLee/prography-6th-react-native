import _ from "lodash";
import { types } from "mobx-state-tree";

import Todo from "src/stores/model/Todo";

const TodoStore = types
  .model("TodoStore", {
    todos: types.optional(types.array(Todo), [])
  })
  .views(self => {
    return {
      get todoViews() {
        return Array.from(self.todos);
      }
    };
  })
  .actions(self => {
    const addTodo = (title: string) => {
      self.todos.push(Todo.create({ id: _.uniqueId("todo"), title }));
    };

    const removeById = (id: string) => {
      const existItem = self.todos.find(item => item.id === id);
      if (existItem) {
        self.todos.remove(existItem);
      }
    };

    return {
      addTodo,
      removeById
    };
  });

export type ITodoStore = typeof TodoStore.Type;

export default TodoStore;
