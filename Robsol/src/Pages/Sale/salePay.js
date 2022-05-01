import React,{useContext, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,

} from 'react-native';

import api from '../../services/api'

import _ from 'underscore';

import styles from './styles';

import {decode, encode} from 'base-64';
import typeIcons from '../../utils/typeIcons'

import {CartContext} from '../../Contexts/cart'

import ModObs from '../../Modal/modObs'


if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function SalePay({route,navigation}){

    const { data,dataBack,vendedor } = route.params;
    const { cart,cliente } = useContext(CartContext)
    
    const [visibleObs,setVisibleObs] = useState(false);
    const [txtObs,setTxtObs] = useState('')
    const [payment,setPayment] = useState('');


    const geraPedido = async() =>{
        
        const copyCart = [...cart];
        const copyClient = {...cliente};

        let paramPed = {
            CLIENTE: copyClient,
            CONDPAGTO: payment,
            DESCONTO: '',
            FORCE: 'TRUE',
            ITEMS: copyCart,
            VENDEDOR: vendedor,
            OBSERVATION: txtObs
        }

        await api.post("/prtl003", { body: JSON.stringify(paramPed) })
        .then(async (item) => {
            if (item.data.code == "200") {
                alert('Seu pedido foi enviado com sucesso');

                navigation.navigate('Home',{dataUser:dataBack[2]})
            }

        })
        .catch((err) => {
            alert("Erro na geração do pedido")
            console.log(err);
        });
  }

    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={{backgroundColor:'#fff',width:'100%',flex:1}}>
                <View style={[styles.headerSales,{marginBottom:30}]}>  
                    <TouchableOpacity onPress={()=>{navigation.navigate('SalePrd',{
                        nameSec:dataBack[0],
                        data:dataBack[1],
                        dataUser:dataBack[2],
                        filter:dataBack[3],
                    })}}>
                        <Image source={typeIcons[2]} />
                    </TouchableOpacity>

                    <Text style={{fontSize:24,fontWeight:'bold', color:'#fff'}}>Cond. Pagamento</Text>
                </View> 

                <FlatList
                    data={data.sort((a, b) => a.codigo.localeCompare(b.codigo))}
                    renderItem={({item})=>

                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <TouchableOpacity 
                                style={{
                                    marginVertical:5,
                                    borderWidth:2,
                                    borderColor:'#175A93',
                                    borderRadius:10,
                                    width:'90%',
                                    justifyContent:'center',
                                    paddingHorizontal:20,
                                    paddingVertical:10
                                }}
                                onPress={()=>{ setVisibleObs(true),setPayment(item.codigo) }}

                            > 
                                <Text>{'Codigo: ' + item.codigo.trim()}</Text>
                                <Text>{'Descrição: ' + item.descricao.trim()}</Text>
                                <Text>{'Forma: ' + item.forma.trim()}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Registro não encontrado</Text>
                        </View>
                    }
                />
            
            </View>

    
            <ModObs visibleObs={visibleObs}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:50}}>
                    <Text style={{fontSize:22, fontWeight:'bold'}}>Observação</Text>

                    <TouchableOpacity onPress={() => {setVisibleObs(false),setTxtObs('')}}>
                        <Image
                            source={typeIcons[15]}
                            style={{height: 25, width: 25}}
                        />
                    </TouchableOpacity>
                </View>

    
                <View style={{justifyContent:'space-between'}}>
                    <TextInput 
                        placeholder='digite a observação...'
                        placeholderTextColor={'#9E8989'}
                        multiline={true}
                        value={txtObs}
                        onChangeText={text => setTxtObs(text)}
                        style={{
                            borderWidth:2,
                            borderColor:'#2F8BD8',
                            borderRadius:10,
                            height:100,
                            padding:10,
                            paddingTop:10
                        }}
                    />
                </View>

                <TouchableOpacity 
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        height:40,
                        backgroundColor:'#000',
                        opacity:0.8,
                        borderRadius:10,
                        marginHorizontal:80,
                        marginVertical:30
                    }}
                    onPress={()=>{geraPedido()}}
                >
                    <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Enviar Pedido</Text>
                </TouchableOpacity>
            

            </ModObs>
        </SafeAreaView>
        
    )
}

