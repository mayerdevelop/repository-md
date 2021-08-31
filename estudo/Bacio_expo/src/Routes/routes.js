import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Pages/Home/index'
import Profile from '../Pages/Profile/index'
import Detail from '../Pages/Detail/index'
import Login from '../Pages/Login/index'
import Header from '../Components/Header/index'
import DetailProd from '../Pages/PosDet/DetailProd'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Header" component={Header}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Detail" component={Detail}/>
            <Stack.Screen name="DetailProd" component={DetailProd}/>
        </Stack.Navigator>
    )
};