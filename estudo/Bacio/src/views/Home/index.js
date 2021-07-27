import React,{useState, useEffect} from 'react';
import {ScrollView,SafeAreaView,View,Text,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import styles from './styles';
import {decode, encode} from 'base-64'

import Footer from '../../components/Footer/index'

import bell2 from '../../assets/bell2.png';
import typeIcons from '../../utils/typeIcons';

import api from '../../services/api'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Home({navigation}){
    
    const [load, setLoad] = useState(false);

    const loadProd = async() =>{
        setLoad(true)
        
        try{
          const response = await api.get('/produtos',{
              withCredentials: true,
              auth: {username:'felipe.mayer',password:'82514903'} })

              setLoad(false)
              navigation.navigate('Detail',{clasId:'Produtos',prods:response.data})
            }
        catch(error){
            alert(error)
        }
    };
      
    return( 
        
        <SafeAreaView style={[{backgroundColor: '#fff',flex: 1},styles.container]}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Olá, Felipe!</Text>

                <TouchableOpacity style={styles.notification}>
                    <Image source={bell2} style={styles.notificationImage}/>
                    <View style={styles.circle}/>
                </TouchableOpacity>
            </View>

            <ScrollView style={{marginBottom:70}}>
                <View style={{flex:1}}>
                    <Text style={styles.sectionTitle}>Cadastros</Text>
                
                    <View style={styles.content} >
          
                        <TouchableOpacity onPress={loadProd} style={styles.card}>
                            {load ? 
                                <View style={{flex:1,flexDirection:'row',top:5}}>
                                    <ActivityIndicator color={'#723600'} size={50}/>
                                </View>
                                :
                                <Image 
                                    source={typeIcons[7]} 
                                    style={{resizeMode:'contain',width:45,top:5}}
                                />
                            }
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Produtos'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{clasId:'Clientes'})}} style={styles.card}>
                            <Image 
                                source={typeIcons[6]} 
                                style={{resizeMode:'contain',width:58,top:10}}
                            />
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Clientes'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{clasId:'Fornecedores'})}} style={styles.card}>
                            <Image 
                                source={typeIcons[9]} 
                                style={{resizeMode:'contain',width:62,top:10}}
                            />
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Fornecedores'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{clasId:'Lojas'})}} style={styles.card}>
                            <Image 
                                source={typeIcons[17]} 
                                style={{resizeMode:'contain',top:12}}
                            />
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Lojas'}</Text>
                            </View>
                        </TouchableOpacity>   
                    </View>

                    <Text style={styles.sectionTitle}>Pedidos</Text>

                    <View style={styles.content} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{clasId:'Pedidos de Compras'})}} style={styles.cardP}>
                            <Image 
                                source={typeIcons[13]} 
                                style={{width:30,height:38,top:12}}
                            />
                            <View style={styles.titleContentP}>
                                <Text style={styles.cardTitleP}>{'Pedidos de Compras'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{clasId:'Pedidos de Vendas'})}} style={styles.cardP}>
                            <Image 
                                source={typeIcons[14]} 
                                style={{resizeMode:'contain',left:10,top:12}}
                            />
                            <View style={styles.titleContentP}>
                                <Text style={styles.cardTitleP}>{'Pedidos de Vendas'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ScrollView>
            <Footer navigation={navigation} icon={null} />
        </SafeAreaView>
    )
}