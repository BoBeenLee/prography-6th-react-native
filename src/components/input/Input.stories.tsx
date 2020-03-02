import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react-native";
import React from "react";

import TodoInput from "src/components/input/TodoInput";

storiesOf("Input", module)
  .add("TodoInput", () => {
    return (
      <TodoInput onAdd={action("onAdd")} />
    );
  })
