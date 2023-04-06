import React from 'react';
import * as Style from './styles';

import { AntDesign } from '@expo/vector-icons';

export default function footer({navigation}){
    return(
        <>
        <Style.FooterComponent>
            <Style.ButtonFooter>
                <AntDesign name="home" size={24} color="white" />
            </Style.ButtonFooter>

            <Style.ButtonFooter>
                <AntDesign name="shoppingcart" size={24} color="white" />
            </Style.ButtonFooter>

            <Style.ButtonFooter>
                <AntDesign name="user" size={24} color="white" />
            </Style.ButtonFooter>
        </Style.FooterComponent>
        
        <Style.TextOffline>offline</Style.TextOffline>
        </>
    )
}