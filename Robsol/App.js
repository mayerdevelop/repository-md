import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/Routes/routes';
import { LogBox } from 'react-native';
import CartProvider from './src/Contexts/cart';

LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
      <NavigationContainer>
        <CartProvider>
          <Routes/>
        </CartProvider>
      </NavigationContainer>
  );
}