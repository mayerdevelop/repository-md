import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/Routes/routes';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
  );
}