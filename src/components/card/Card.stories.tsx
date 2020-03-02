import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';

import TodoCard from 'src/components/card/TodoCard';

const TodoContainer = styled.View`
  flex-direction: column;
`;

storiesOf('Card', module).add('TodoCard', () => {
  return (
    <TodoContainer>
      <TodoCard status="text" title="헬로우월드드드" />
      <TodoCard
        status="text"
        title="헬로우월드드드"
        onModify={action('onModify')}
        onDelete={action('onDelete')}
      />
      <TodoCard
        status="text"
        title="헬로우월드드드"
        onComplete={action('onComplete')}
      />
    </TodoContainer>
  );
});
