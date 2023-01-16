import React from "react";
import { 
    View,
    Text,
    SafeAreaView
} 
from 'react-native'

import styles from './styles';

import LottieView from 'lottie-react-native';
import Wave from '../../../assets/@svg/wave.svg'


export default function Login({navigation}){

    return(
        <>
        <SafeAreaView style={{flex:0, backgroundColor:'#426AD0'}} />
        <SafeAreaView style={styles.container}>
            <View style={{
                flex:0,
                width:'100%',
                bottom:100
            }}>
                <Wave />
                <LottieView
                    source={require('../../../assets/loginlottie.json')}
                    autoPlay={true}
                    resizeMode="cover"
                    style={{width:'90%', marginTop:20}}
                /> 
            </View>

            <View style={{
                flex:1,
                backgroundColor:'#fff',
                width:'100%',
            }}>

            </View>
        </SafeAreaView>
        </>
    )
}