import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { LogBox,BackHandler,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import * as Updates from "expo-updates";


if(Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-IN');
}

LogBox.ignoreAllLogs();//Ignore all log notifications

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
      <StatusBar hidden={true} />
      <Routes />
    </NavigationContainer>
  );
};

export default App;