import React,{useEffect, useState} from 'react';
import {Text,SafeAreaView,View,Image,TouchableOpacity,FlatList} from 'react-native';

import styles from './styles';
import logo from '../../Assets/logo.png'
import maps from '../../Assets/maps.png'

import Footer from '../../Components/Footer';
import api from '../../Services/api';

import { FontAwesome5 } from '@expo/vector-icons';

export default function Home({navigation}){

    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        (async function(){
        try{
            const response = await api.get('/calendar/all');
            setCalendar(response.data)
        }catch(error){
            alert(JSON.stringify(error))
        }
        })();
    }, []);

    const data = new Date()

    let dia = data.getDate().toString().padStart(2, '0')
    let mes = (data.getMonth()+1).toString().padStart(2, '0')
    let ano = data.getFullYear().toString()

    const dataSelected = ano+'-'+mes+'-'+dia

    const itemCalend = []
    
    for (var i = 0; i < calendar.length; i++) {
        if(calendar[i].data >= dataSelected && itemCalend.length <= 3){
        itemCalend.push(calendar[i])
    }}

    return(
        <>
        <SafeAreaView edges={["top"]} style={{ flex: 0, backgroundColor: "#96250C" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",alignItems:'center'}}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logo} style={{width:90,height:90,marginTop:10,resizeMode:'contain'}}/>

                    <View style={{justifyContent:'center',flex:1}}>
                        <Text style={styles.txtHeader}>Capítulo Eduardo Henrique 299</Text>
                    </View>
                </View>

             
                <View>
                    <View style={{margin:20}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Próximos Eventos</Text>
                            
                        <FlatList
                            data={itemCalend.sort((a, b) => a.data.localeCompare(b.data))}
                            renderItem={({item})=>

                            <TouchableOpacity 
                                style={{
                                    marginTop:10,
                                    borderWidth:1,
                                    borderRadius:10,
                                    padding:5,
                                    backgroundColor:'#F1F1F1'
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    marginHorizontal:5,
                                    alignItems:'center',
                                    borderBottomWidth:1.5,
                                    paddingBottom:7,
                                    borderBottomColor:"#4D84C5",
                                    marginBottom:10
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesome5 name="calendar-alt" size={24} color="#4D84C5" />
                                        <Text style={{marginHorizontal:8,fontSize:15,fontWeight:'bold'}}>{item.type}</Text>
                                    </View>
                                    <Text style={{fontWeight:'bold',fontSize:18}}>
                                        {item.data.substring(8,10)+'/'+item.data.substring(5,7)+'/'+item.data.substring(0,4)}
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row',marginHorizontal:5,justifyContent:'space-between',}}>
                                    <Text style={{fontSize:17,fontWeight:'bold'}}>{item.address}</Text>
                                    <Image source={maps}/>
                                </View>
                            </TouchableOpacity>
                
                            }
                            
                            keyExtractor={(item) => item._id}
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>Não há próximos eventos cadastrados.</Text>
                                </View>
                            }
                        />
                        
                        <View style={{marginTop:28}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Pendências</Text>
                        </View>
                    </View>                
                </View>
            </View>

            

            <Footer navigation={navigation} />
        </SafeAreaView>
        </>
    )
}