import React,{useEffect} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { LogBox,BackHandler,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

LogBox.ignoreAllLogs();//Ignore all log notifications

if(Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en-IN');
}

export default function App() {

  useEffect(() => {
    BackHandler.addEventListener('backPress', () => true)
    return () => BackHandler.removeEventListener('backPress', () => true)
  }, [])


  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Routes />
    </NavigationContainer>
  );
}
