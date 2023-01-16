import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './pages/list/index'
import Login from './pages/login/index'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator 
            screenOptions={{gestureEnabled: false, headerShown: false}}
        >   
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
    )
};