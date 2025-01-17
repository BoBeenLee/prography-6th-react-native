import { flow, types } from "mobx-state-tree";
import { AppState, AppStateStatus } from "react-native";

import TodoStore from "src/stores/TodoStore";

const Store = types.model({
  appStateStatus: types.frozen<AppStateStatus>(AppState.currentState),
  todoStore: types.optional(TodoStore, {})
});

export type IStore = typeof Store.Type;

let store: IStore | null = null;
const getRootStore = (): IStore => {
  if (store === null) {
    store = Store.create({
      appStateStatus: AppState.currentState
    });
  }
  return store;
};

export default Store;
export { getRootStore };
