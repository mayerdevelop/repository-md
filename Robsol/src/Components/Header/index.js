import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';

import styles from './styles';
import back from '../../assets/back.png';

export default function Header({showBack,backPage,navigation}){

    return(
  
        <View style={styles.header}>
            <View style={styles.container}>
                <View style={styles.leftIcon}>
                    { showBack ?
                        <TouchableOpacity onPress={()=>{navigation.navigate(backPage)}}>
                            <Image source={back}/>
                        </TouchableOpacity>
                    : null }
                </View>
            </View>
        </View>
    )

}