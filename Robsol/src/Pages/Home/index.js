import React,{useState, useContext} from 'react';
import {Text,SafeAreaView,View,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import typeIcons from '../../utils/typeIcons';
import {decode, encode} from 'base-64';

import api from '../../services/api'

import {CartContext} from '../../Contexts/cart'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import styles from './styles';

import Footer from '../../Components/Footer/index'

export default function Home({route,navigation}){

    const { addCart,dataUser } = useContext(CartContext)

    const authBasic = 'YWRtaW46QVZTSTIwMjI';

    const [loadSec, setLoadSec] = useState('');
    
    const apiSections = async(sec) =>{
        
        const response = await api.get(`/${sec}/`,{
            withCredentials: true,
            headers: {
                'Authorization': 'Basic '+authBasic,
                'VENDEDOR': dataUser.cod_vendedor,
                'page': 1,
                'pageSize': 10
            } 
        })

        setLoadSec('')
        
        let initialFilter = ''

        switch (sec) {
            case "Products":
                initialFilter = 'CODIGO'
                break;
            case "Customers":
                initialFilter = 'cnpj'
                break;
            default:
                break;
        }

        let icon = null

        if(sec == 'Sales'){
            icon = 'add' 
            addCart([])
        };

        navigation.navigate('Detail',{
            nameSec:sec,
            data:response.data["items"],
            filter:initialFilter,
            icon:icon,
            prdProd:false
        })
    };

    return(
        <>
        <SafeAreaView edges={["top"]} style={{ flex: 0, backgroundColor: "#175A93" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.contTextHeader}>
                        <Text style={styles.textHeader}>  
                            Olá, {dataUser.nome_usuario.split(" ",1)}!
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.logout} onPress={()=>{navigation.navigate('Login')}}>
                        <Image source={typeIcons[11]} style={styles.logoutImage}/>
                    </TouchableOpacity>
                </View>

                <View style={{marginVertical:45,width:'100%'}}>
                    <View style={styles.content}>
                        <TouchableOpacity onPress={()=>{apiSections('Products'); setLoadSec('Products')}} style={styles.card}>
                            {loadSec == 'Products' ? 
                                <View style={{flex:1,flexDirection:'row',top:5}}>
                                    <ActivityIndicator color={'#000000'} size={50}/>
                                </View>
                                :
                                <View>
                                    <Image source={typeIcons[3]} style={{marginTop:20}}/>
                                </View>
                            }
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Produtos'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{apiSections('Customers'); setLoadSec('Customers')}} style={styles.card}>
                            {loadSec == 'Customers' ? 
                                <View style={{flex:1,flexDirection:'row',top:5}}>
                                    <ActivityIndicator color={'#000000'} size={50}/>
                                </View>
                                :
                                <View>
                                    <Image source={typeIcons[10]} style={{resizeMode:'contain',width:58}}/>
                                </View>
                            }

                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Clientes'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{apiSections('Sales'); setLoadSec('Sales')}} style={styles.card}>
                            {loadSec == 'Sales' ? 
                                <View style={{flex:1,flexDirection:'row',top:5}}>
                                    <ActivityIndicator color={'#000000'} size={50}/>
                                </View>
                                :
                                <View>
                                    <Image source={typeIcons[12]} style={{resizeMode:'contain',width:50}}/>
                                </View>
                            }

                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Pedidos'}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity  style={styles.card}>
            
                            <View>
                                <Image source={typeIcons[6]} style={{resizeMode:'contain',width:50,height:44,top:10}}/>
                            </View>
           
                            <View style={styles.titleContent}>
                                <Text style={styles.cardTitle}>{'Comissões'}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                     
                </View>
                <Footer navigation={navigation} backPage={'Home'}/>
            </View>
        </SafeAreaView>
        </>
    )
}