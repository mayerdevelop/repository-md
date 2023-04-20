import React,{useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import { LogBox,StatusBar,BackHandler,Platform } from 'react-native';
import * as Updates from "expo-updates";

import 'react-native-reanimated'
import 'react-native-gesture-handler'

if(Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-IN');
}

LogBox.ignoreAllLogs();//Ignore all log notifications
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

const App: React.FC = () => {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={'#3C5CAE'} />
        <Routes/>
    </NavigationContainer>
  );
};


export default App;