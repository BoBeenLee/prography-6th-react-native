import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import App from './src/App';
import {name as appName} from './app.json';
import Storybook from "./storybook";

AppRegistry.registerComponent(appName, () => App);
