import React,{useEffect, useState} from 'react';
import {Text,SafeAreaView,View,Image,TouchableOpacity,FlatList} from 'react-native';

import styles from './styles';
import logo from '../../Assets/logo.png'
import maps from '../../Assets/maps.png'
import capa from '../../Assets/capa.png'

import Footer from '../../Components/Footer';
import api from '../../Services/api';

import { MaterialIcons,Ionicons,Octicons } from '@expo/vector-icons';

export default function Home({route,navigation}){


    return(
        <>
        <SafeAreaView edges={["top"]} style={{ flex: 0, backgroundColor: "#96250C" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",alignItems:'center'}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        justifyContent:'flex-start',
                        flex:1,
                        margin:15
                    }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity>
                                <Image style={{resizeMode:'contain'}} source={capa} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                                <MaterialIcons name="logout" size={30} color="#FBBC04" />
                            </TouchableOpacity>
                        </View>
                    
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity>
                                <Ionicons name="person-circle" size={180} color="white" />
                            </TouchableOpacity>

                            <Text style={{fontSize:22,color:'white'}}>Nome do DeMolay</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{
                    marginTop:10,
                    justifyContent:'center',
                    alignItems:'flex-end',
                    flexDirection:'row'
                }}>
                    <Octicons name="person" size={30} color="black" />
                    <Text style={{marginLeft:5}}>Meus Dados</Text>
                </View>

                <View style={{
                    backgroundColor:'#F1F1F1',
                    justifyContent:'center',
                    alignItems:'flex-start',
                    marginHorizontal:40,
                    marginTop:5,
                    borderRadius:10,
                    padding:20
                }}>
                    <Text>ID: XXXXXX</Text>
                    <Text>ID: XXXXXX</Text>
                    <Text>ID: XXXXXX</Text>
                    <Text>ID: XXXXXX</Text>
                    <Text>ID: XXXXXX</Text>
                </View>
                
            </View>

            

            <Footer navigation={navigation} />
        </SafeAreaView>
        </>
    )
}