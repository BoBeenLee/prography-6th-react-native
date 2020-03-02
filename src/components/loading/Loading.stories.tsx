import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';

import Loading from 'src/components/loading/Loading';

const Container = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

storiesOf('Loading', module).add('Loading', () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
});
