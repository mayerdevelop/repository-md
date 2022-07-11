import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes/routes';
import { LogBox,StatusBar } from 'react-native';
import Context from './src/contexts/index'

LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Context>
          <Routes/>
        </Context>
      </NavigationContainer>
  );
}