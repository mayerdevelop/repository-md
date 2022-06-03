import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Pages/Home/index'
import Calendar from '../Pages/Calendar/index'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator   
            screenOptions={()=> ({headerShown: false})}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Calendar" component={Calendar}/>
        </Stack.Navigator>
    )
};