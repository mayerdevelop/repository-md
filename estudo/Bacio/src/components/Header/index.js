import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';

import styles from './styles';
import back from '../../assets/back.png';
import search from '../../assets/search.png';

export default function Header({showBack,backPage,showSearch,navigation}){

    const nameSec = navigation.getParam('clasId', 'NO-ID')
    
    return(

        <View style={styles.header}>
            { showBack ?

            <TouchableOpacity style={styles.leftIcon} onPress={()=>{navigation.navigate(backPage,{clasId:nameSec})}}>
                <Image source={back} style={styles.leftIconImage}/>
            </TouchableOpacity>
            :
            <View/>
            }

            { showSearch ?
                <TouchableOpacity style={styles.Search} >
                <Image source={search} style={styles.SearchImage}/>
            </TouchableOpacity>
            :
            <View/>
            }
        </View>
    )

}