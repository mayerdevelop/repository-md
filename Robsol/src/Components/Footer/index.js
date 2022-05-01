import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'

import typeIcons from '../../utils/typeIcons';

import styles from '../../Components/Footer/styles';

export default function Footer({icon,navigation}){

    return(
        <View style={styles.footerContent}>
            <TouchableOpacity style={styles.imageContent} onPress={()=>{navigation.navigate('Home')}}>
                <Image style={{resizeMode:'contain',width:35}} source={typeIcons[5]}/>
                <Text style={styles.titleButtom}>Home</Text>
            </TouchableOpacity>

            { icon != null ?
                <TouchableOpacity style={styles.imageConfirm}>
                    <Image source={icon =='add' ? typeIcons[1] : typeIcons[3]}/>
                </TouchableOpacity>
                : 
                <></>
            }
            <TouchableOpacity style={styles.imageContent} onPress={()=>{ }}>
                <Image style={{resizeMode:'contain',width:30}} source={typeIcons[7]}/>
                <Text style={styles.titleButtom}>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}