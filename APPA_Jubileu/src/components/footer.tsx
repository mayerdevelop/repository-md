import React from 'react';
import * as Style from './styles';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

interface Props{
    buttomAdd: any
}

export default function footer({buttomAdd}: Props){

    const navigation = useNavigation();

    return(<>
        <Style.FooterComponent style={Style.styleSheet.shadow}>
            <Style.ButtonFooter 
                onPress={() => navigation.navigate('home')}
                activeOpacity={0.6}
            >
                <AntDesign
                    name="home"
                    size={24}
                    color="white"
                />
            </Style.ButtonFooter>

            { buttomAdd ?
                <Style.ButtonAddFooter 
                    style={Style.styleSheet.shadow}
                    activeOpacity={0.6}
                >
                    <AntDesign
                        name="pluscircleo"
                        size={55}
                        color="#426AD0"
                    />
                </Style.ButtonAddFooter>
            :
                <Style.ButtonFooter>
                    <AntDesign
                        name="shoppingcart"
                        size={24}
                        color="white"
                    />
                </Style.ButtonFooter>
            }

            <Style.ButtonFooter>
                <AntDesign
                    name="user"
                    size={24}
                    color="white"
                />
            </Style.ButtonFooter>
        </Style.FooterComponent>        
    </>)
}