import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/Routes/routes';
import { LogBox,StatusBar } from 'react-native';
import CartProvider from './src/Contexts/cart';

import * as Updates from 'expo-updates';

LogBox.ignoreAllLogs();//Ignore all log notifications


const updateAppAutomatic = async() =>{
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // ... notify user of update ...
      Updates.reloadAsync();
    }
  } catch (e) {
    // handle or log error
  }
}

//useEffect(() => {updateAppAutomatic()}, []);



export default function App() {
  return (
      <NavigationContainer>
        <StatusBar hidden={true} />
        <CartProvider>
          <Routes/>
        </CartProvider>
      </NavigationContainer>
  );
}