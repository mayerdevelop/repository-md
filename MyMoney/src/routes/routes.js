import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import loadVerify from './loadVerify'
import Home from '../pages/home/index'
import ModalAdd from '../modal/ModalAdd'

const Stack = createStackNavigator();


export default function Routes(){

    return(
        <Stack.Navigator screenOptions={()=> ({headerShown: false})}>
            <Stack.Group>
                <Stack.Screen name="loadVerify" component={loadVerify}/>
                <Stack.Screen name="Home" component={Home}/>
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="ModalAdd" component={ModalAdd} />
            </Stack.Group>
        </Stack.Navigator>
    )
};