import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import styles from '../../Components/Footer/styles';

export default function Footer({navigation}){

    return(
        <View style={styles.footerContent}>
            <TouchableOpacity style={styles.imageContent} onPress={()=>{navigation.navigate('Home')}}>
                <Ionicons name="home" size={35} color="white" />
                <Text style={styles.titleButtom}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContent} onPress={()=>{ }}>
                <Ionicons style={{marginBottom:3}} name="person" size={35} color="white" />
                <Text style={styles.titleButtom}>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}