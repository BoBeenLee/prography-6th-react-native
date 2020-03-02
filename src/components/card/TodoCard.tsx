import _ from "lodash";
import React, { useState } from "react";
import { ViewProps } from "react-native";
import styled, { css } from "styled-components/native";

type ButtonType = "modify" | "delete" | "complete";

interface Props {
  style?: ViewProps["style"];
  checked: boolean;
  status: "text" | "input";
  title: string;
  onPress: () => void;
  onModify?: () => void;
  onDelete?: () => void;
  onComplete?: (text: string) => void;
}

const ButtonTextColor: { [key in ButtonType]: string } = {
  modify: "#51B0EB",
  delete: "#FF0000",
  complete: "#4E4A4B"
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  background-color: #e4cdce;
  padding-left: 20px;
  padding-right: 5px;
`;

const Content = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text<{ checked: boolean }>`
  flex: 1;
  ${({ checked }) =>
    checked
      ? css`
          text-decoration-line: line-through;
        `
      : css``}
`;

const TitleInput = styled.TextInput`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  margin-horizontal: 15px;
`;

const ButtonText = styled.Text<{ type: ButtonType }>`
  color: ${({ type }) => ButtonTextColor[type]};
`;

const TodoCard = (props: Props) => {
  const {
    style,
    checked,
    status,
    title,
    onPress,
    onModify,
    onDelete,
    onComplete
  } = props;
  const [titleInput, setTitleInput] = useState(title);

  const onChangeText = (text: string) => {
    setTitleInput(text);
  };
  return (
    <Container style={style}>
      <Content onPress={onPress}>
        {status === "input" ? (
          <TitleInput
            autoFocus={true}
            value={titleInput}
            onChangeText={onChangeText}
          />
        ) : (
          <Title checked={checked}>{title}</Title>
        )}
      </Content>
      {onModify ? (
        <Button onPress={onModify}>
          <ButtonText type="modify">수정</ButtonText>
        </Button>
      ) : null}
      {onDelete ? (
        <Button onPress={onDelete}>
          <ButtonText type="delete">삭제</ButtonText>
        </Button>
      ) : null}
      {onComplete ? (
        <Button onPress={_.partial(onComplete, titleInput)}>
          <ButtonText type="complete">완료</ButtonText>
        </Button>
      ) : null}
    </Container>
  );
};

export default TodoCard;
