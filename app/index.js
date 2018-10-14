/** @format */

import {AppRegistry} from 'react-native';
import App from './src/views/App';
import {name as appName} from './app.json';
import {Notifications} from './src/notifications.js'

AppRegistry.registerComponent(appName, () => App);
