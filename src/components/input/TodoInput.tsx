import _ from "lodash";
import React, { useState, useCallback } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

interface Props {
  style?: ViewProps["style"];
  onAdd: (text: string) => void;
}

const Container = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

const InputView = styled.View`
  flex: 1;
  justify-content: center;
  height: 100%;
  background-color: #e7e0e0;
  padding-left: 20px;
`;

const Input = styled.TextInput``;

const AddButton = styled.TouchableOpacity`
  width: 80px;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #eb0041;
`;

const AddButtonText = styled.Text`
  color: #fff;
`;

const TodoInput = (props: Props) => {
  const { style, onAdd } = props;
  const [text, setText] = useState("");

  const onChangeText = useCallback(
    (text: string) => {
      setText(text);
    },
    [text]
  );

  const addTodo = useCallback(
    (text: string) => {
      onAdd(text);
      setText("");
    },
    [text]
  );

  return (
    <Container style={style}>
      <InputView>
        <Input
          autoFocus={true}
          placeholder="메모를 적어보세요"
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={_.partial(addTodo, text)}
        />
      </InputView>
      <AddButton onPress={_.partial(addTodo, text)}>
        <AddButtonText>추가</AddButtonText>
      </AddButton>
    </Container>
  );
};

export default TodoInput;
