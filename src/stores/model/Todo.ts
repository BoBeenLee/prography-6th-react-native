import { types } from "mobx-state-tree";

const Todo = types
  .model("Todo", {
    id: types.identifier,
    title: types.string,
    checked: types.optional(types.boolean, false)
  })
  .actions(self => {
    return {
      setTitle(title: string) {
        self.title = title;
      },
      setChecked(checked: boolean) {
        self.checked = checked;
      }
    };
  });

export type ITodo = typeof Todo.Type;

export default Todo;
