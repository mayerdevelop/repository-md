import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'

import {Ionicons,FontAwesome5} from '@expo/vector-icons';

import styles from '../../Components/Footer/styles';

export default function Footer({navigation}){

    return(
        <View style={styles.footerContent}>
            <TouchableOpacity style={styles.imageContent} onPress={()=>{navigation.navigate('Home',{refreshCalend:true})}}>
                <Ionicons name="home" size={30} color="white" />
                <Text style={styles.titleButtom}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContent} onPress={()=>{navigation.navigate('Calendar')}}>
                <Ionicons style={{marginBottom:3}} name="md-calendar-sharp" size={30} color="white" />
                <Text style={styles.titleButtom}>Calendário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContent}>
                <FontAwesome5 style={{marginBottom:5}} name="book" size={28} color="white" />
                <Text style={styles.titleButtom}>Aprendizado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageContent}>
                <Ionicons style={{marginBottom:1}} name="person" size={30} color="white" />
                <Text style={styles.titleButtom}>Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}