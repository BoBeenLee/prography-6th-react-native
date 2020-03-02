import _ from "lodash";
import React, { Component, ComponentClass } from "react";
import { FlatListProps, FlatList, ListRenderItem } from "react-native";
import { inject, observer, Observer } from "mobx-react";
import styled from "styled-components/native";

import { StackNavigationProp } from "@react-navigation/stack";
import TodoInput from "src/components/input/TodoInput";
import { IStore } from "src/stores/Store";
import { ITodoStore } from "src/stores/TodoStore";
import { ITodo } from "src/stores/model/Todo";
import TodoCard from "src/components/card/TodoCard";

interface Inject {
  todoStore: ITodoStore;
}

interface Props extends Inject {
  navigation: StackNavigationProp<any>;
}

interface States {
  selectedTodoItem: ITodo | null;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #eee;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Todos = styled<ComponentClass<FlatListProps<ITodo>>>(FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 95
  }
})`
  flex: 1;
  width: 100%;
`;

@inject(
  ({ store }: { store: IStore }): Inject => ({
    todoStore: store.todoStore
  })
)
@observer
class TodoScreen extends Component<Props, States> {
  public static open(
    navigation: StackNavigationProp<any>
  ): void {
    navigation.navigate("Todo");
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTodoItem: null
    };
  }

  public render() {
    const { todoViews } = this.props.todoStore;
    return (
      <Container>
        <TodoInput onAdd={this.onTodoAdd} />
        <Todos
          data={todoViews}
          keyExtractor={this.todoItemKeyExtractor}
          renderItem={this.renderTodoItem}
        />
      </Container>
    );
  }

  private todoItemKeyExtractor = (item: ITodo, index: number) => {
    return `${item.id}${index}`;
  };

  private renderTodoItem: ListRenderItem<ITodo> = ({ item }) => {
    return (
      <Observer>
        {() => {
          const { title, checked } = item;
          const { selectedTodoItem } = this.state;
          const status = selectedTodoItem?.id === item.id ? "input" : "text";
          return (
            <TodoCard
              checked={checked}
              status={status}
              title={title}
              onPress={_.partial(this.onTodoToggle, item)}
              onModify={
                status === "text"
                  ? _.partial(this.onTodoModify, item)
                  : undefined
              }
              onDelete={
                status === "text"
                  ? _.partial(this.onTodoDelete, item.id)
                  : undefined
              }
              onComplete={status === "input" ? this.onTodoComplete : undefined}
            />
          );
        }}
      </Observer>
    );
  };

  private onTodoToggle = (item: ITodo) => {
    item.setChecked(!item.checked);
  };

  private onTodoAdd = (text: string) => {
    const { addTodo } = this.props.todoStore;
    addTodo(text);
  };

  private onTodoDelete = (id: string) => {
    const { removeById } = this.props.todoStore;
    removeById(id);
  };

  private onTodoModify = (item: ITodo) => {
    this.setState({
      selectedTodoItem: item
    });
  };

  private onTodoComplete = (text: string) => {
    const { selectedTodoItem } = this.state;
    selectedTodoItem?.setTitle(text);
    this.setState({
      selectedTodoItem: null
    });
  };
}

export default TodoScreen;
