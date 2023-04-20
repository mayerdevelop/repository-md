import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import login from '../screens/login/index'
import home from '../screens/home/index'
import orders from '../screens/sections/orders';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator headerMode='none' screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name="login" component={login}/>
            <Stack.Screen name="home" component={home}/>
            <Stack.Screen name="orders" component={orders}/>
        </Stack.Navigator>
    )
};