import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import loadVerify from './loadVerify'

const Stack = createStackNavigator();


export default function Routes(){

    return(
        <Stack.Navigator   
            screenOptions={()=> ({headerShown: false})}>
            <Stack.Screen name="loadVerify" component={loadVerify}/>
        </Stack.Navigator>
    )
};