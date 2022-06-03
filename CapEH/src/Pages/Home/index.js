import React from 'react';
import {Text,SafeAreaView,View,Image,TouchableOpacity,ActivityIndicator} from 'react-native';

import styles from './styles';
import logo from '../../Assets/logo.png'

import Footer from '../../Components/Footer';

export default function Home({navigation}){

    return(
        <>
        <SafeAreaView edges={["top"]} style={{ flex: 0, backgroundColor: "#96250C" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logo} style={{width:90,height:90,marginTop:10,resizeMode:'contain'}}/>

                    <View style={{justifyContent:'center',flex:1}}>
                        <Text style={styles.txtHeader}>Capítulo Eduardo Henrique 299</Text>
                    </View>
                </View>

                <Footer navigation={navigation} />
            </View>
        </SafeAreaView>
        </>
    )
}