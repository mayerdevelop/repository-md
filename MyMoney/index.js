import { registerRootComponent } from 'expo';

import App from './App';
import {Platform} from 'react-native'

if(Platform.OS === 'android') {
    require('intl');
    require('intl/locale-data/jsonp/en-IN');
}

registerRootComponent(App);
