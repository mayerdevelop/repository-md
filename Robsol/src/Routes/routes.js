import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Pages/Login/index'
import Home from '../Pages/Home/index'
import Detail from '../Pages/Detail/index'
import Header from '../Components/Header/index'
import SaleCli from '../Pages/Sale/saleCli'
import SalePrd from '../Pages/Sale/salePrd'
import Sections from '../Components/Sections/index'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Header" component={Header}/>
            <Stack.Screen name="Detail" component={Detail}/>
            <Stack.Screen name="Sections" component={Sections}/>
            <Stack.Screen name="SaleCli" component={SaleCli}/>
            <Stack.Screen name="SalePrd" component={SalePrd}/>
        </Stack.Navigator>
    )
};