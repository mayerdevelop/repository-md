import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Pages/Home/index'
import Login from '../Pages/Login/index'
import Calendar from '../Pages/Calendar/index'
import Profile from '../Pages/Profile/index'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator   
            screenOptions={()=> ({headerShown: false})}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Calendar" component={Calendar}/>
            <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
    )
};