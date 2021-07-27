import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';

import styles from './styles';

import Home from '../../assets/home.png';
import Profile from '../../assets/profile.png';

import add from '../../assets/add.png'
import check from '../../assets/check.png'

export default function Footer({icon,navigation,onPress}){

    function navHome(){
        navigation.navigate('Home')
    }

    return(

        <View style={styles.container} >
            <TouchableOpacity onPress={navHome} >
                <Image style={styles.navFooter} source={Home}/>
            </TouchableOpacity>

            { icon != null ?
                <TouchableOpacity style={styles.buttom} onPress={onPress}>
                    <Image source={icon =='add' ? add : check}/>
                </TouchableOpacity>
                : null
            }

            <TouchableOpacity>
                <Image style={styles.navFooter} source={Profile}/>
            </TouchableOpacity>
        </View>      
    )
}