import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import login from '../Pages/login/index'
import home from '../Pages/home/index'
import produtos from '../Pages/cadastros/produtos'

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator headerMode='none' screenOptions={{gestureEnabled: false}}>
            <Stack.Screen name="produtos" component={produtos}/>
        </Stack.Navigator>
    )
};

//<Stack.Screen name="login" component={login}/>
//<Stack.Screen name="home" component={home}/>