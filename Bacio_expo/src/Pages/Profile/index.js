import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'

import styles from './styles'
import typeIcons from '../../utils/typeIcons';

import Footer from '../../Components/Footer/index'

export default function Profile ({route,navigation}){

    const { dataUser,backPage } = route.params;

    return(
        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>
                <View style={styles.contHeader}>
                    <View style={styles.header}>
                        <TouchableOpacity style={{flex:1}} onPress={()=> navigation.navigate(backPage)}>
                            <Image source={typeIcons[25]}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.buttonExit} onPress={()=> navigation.navigate('Login')}>
                            <Image source={typeIcons[24]} />
                            <Text style={styles.textExit}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.nameUser}>{dataUser[0]?.name}</Text>
                    <Image style={styles.imageUser} source={typeIcons[23]} />
                </View>
                
                <ScrollView style={styles.contScrow}>
                    <View style={styles.contItens}>
                        <Image source={typeIcons[28]} />
                        <Text style={styles.textInfo}>{dataUser[0]?.mail}</Text>
                    </View>

                    <View style={styles.contItens}>
                        <Image source={typeIcons[27]} />
                        <Text style={styles.textInfo}>Consultoria TI</Text>
                    </View>

                    <View style={styles.contItens}>
                        <Image source={typeIcons[26]} />
                        <Text style={styles.textInfo}>Administradores</Text>
                    </View>
                </ScrollView>

                <Footer navigation={navigation} dataUser={dataUser} backPage={'Profile'}/>
            </View>
        </SafeAreaView>
    )
}