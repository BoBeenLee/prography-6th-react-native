import _ from 'lodash';
import {compose} from 'recompose';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import styled from 'styled-components/native';
import withStore from 'src/hocs/withStore';
import {getRootStore} from 'src/stores/Store';
import HomeScreen from 'src/screens/HomeScreen';
import TodoScreen from 'src/screens/TodoScreen';
import MovieScreen from 'src/screens/MovieScreen';

const Stack = createStackNavigator();

const Container = styled(NavigationContainer)`
  flex: 1;
`;

interface ScreenItem {
  component: React.ComponentType<any>;
  name: string;
  options?: object;
}

const store = getRootStore();

const enhanceScreen = (): ScreenItem[] => {
  const screens: ScreenItem[] = [
    {
      component: HomeScreen,
      name: 'Home',
    },
    {
      component: TodoScreen,
      name: 'Todo',
      options: {title: 'Todo List'},
    },
    {
      component: MovieScreen,
      name: 'Movie',
      options: {title: 'Movie'},
    },
  ];
  return screens;
};

const App = (): JSX.Element => {
  return (
    <Container>
      <Stack.Navigator initialRouteName="Home">
        {_.map(enhanceScreen(), item => {
          const {name, component, options} = item;
          return (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Stack.Navigator>
    </Container>
  );
};

export default compose(withStore(store))(App);