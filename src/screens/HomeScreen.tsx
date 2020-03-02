import _ from 'lodash';
import React, {Component} from 'react';
import styled from 'styled-components/native';

import {StackNavigationProp} from '@react-navigation/stack';
import TodoScreen from 'src/screens/TodoScreen';
import MovieScreen from 'src/screens/MovieScreen';

interface Props {
  navigation: StackNavigationProp<any>;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;

const MenuItem = styled.TouchableOpacity`
  width: 300px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: red;
  margin-bottom: 20px;
`;

const MenuItemText = styled.Text`
  font-size: 24px;
  color: white;
`;

class HomeScreen extends Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <MenuItem onPress={_.partial(TodoScreen.open, navigation)}>
          <MenuItemText>To Do List</MenuItemText>
        </MenuItem>
        <MenuItem onPress={_.partial(MovieScreen.open, navigation)}>
          <MenuItemText>Movie</MenuItemText>
        </MenuItem>
      </Container>
    );
  }
}

export default HomeScreen;
