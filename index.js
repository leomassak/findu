/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';

import App from './App';
import { name as appName } from './app.json';
console.disableYellowBox = true;

const locale = RNLocalize.getLocales()[0].languageTag;
moment.locale(locale);

AppRegistry.registerComponent(appName, () => App);
