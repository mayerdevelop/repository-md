import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';

console.disableYellowBox = true;

import Home from './src/views/Home';
import Detail from './src/views/Detail';
import DetailProd from './src/views/PosDet/DetailProd';
import Login from './src/views/Login';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Home,
    Detail,
    DetailProd, 
  })
);

export default function App() {
  return <Routes/>
}