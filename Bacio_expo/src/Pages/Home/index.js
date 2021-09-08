import React,{useState} from 'react';
import {Text,SafeAreaView,View,Image,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import typeIcons from '../../utils/typeIcons';
import {decode, encode} from 'base-64';

import api from '../../services/api'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import styles from './styles';

import bell from '../../assets/bell.png';
import Footer from '../../Components/Footer/index'

export default function Home({route,navigation}){

    const { nameUser } = route.params;

    const [load, setLoad] = useState(false);

    const loadProd = async() =>{
        setLoad(true)
        
        const response = await api.get('/produtos/1',{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} 
        })

        setLoad(false)
        navigation.navigate('Detail',{
            nameSec:'Produtos',
            prods:response.data,
        })
    };

    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.contTextHeader}>
                        <Text style={styles.textHeader}>Olá, {nameUser}!</Text>
                    </View>

                    <TouchableOpacity style={styles.notification}>
                        <Image source={bell} style={styles.notificationImage}/>
                        <View style={styles.circle}/>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{marginBottom:130,width:'100%'}}>
                    <Text style={styles.sectionTitle}>Cadastros</Text>

                    <View style={styles.content}>
                        <TouchableOpacity onPress={loadProd} style={styles.card}>
                            {load ? 
                                <View style={{flex:1,flexDirection:'row',top:5}}>
                                    <ActivityIndicator color={'#723600'} size={50}/>
                                </View>
                                :
                                <View style={styles.iconContent}>
                                    <Image source={typeIcons[5]} style={{resizeMode:'contain',width:45}}/>
                                </View>
                            }
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Produtos'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{nameSec:'Clientes'})}} style={styles.card}>
                            <View style={styles.iconContent}>
                                <Image source={typeIcons[18]} style={{resizeMode:'contain',width:58}}/>
                            </View>

                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Clientes'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{nameSec:'Fornece'})}} style={styles.card}>
                            <View style={styles.iconContent}>
                                <Image source={typeIcons[7]} style={{resizeMode:'contain',width:58}}/>
                            </View>

                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Fornece...'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{nameSec:'Lojas'})}} style={styles.card}>
                            <View style={styles.iconContent}>
                                <Image source={typeIcons[14]} style={{resizeMode:'contain',width:58}}/>
                            </View>

                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Lojas'}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.sectionTitle}>Pedidos</Text>
                    
                    <View style={styles.content}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{nameSec:'Pedidos de Compras'})}} style={styles.cardP}>
                            <Image source={typeIcons[10]} style={{resizeMode:'contain'}}/>
                            <Text style={styles.cardTitleP}>{'Pedidos de Compras'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content} >
                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{nameSec:'Pedidos de Vendas'})}} style={styles.cardP}>
                            <Image source={typeIcons[11]} style={{resizeMode:'contain'}}/>
                            <Text style={styles.cardTitleP}>{'Pedidos de Vendas'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer/>
            </View>
        </SafeAreaView>
    
    )
}