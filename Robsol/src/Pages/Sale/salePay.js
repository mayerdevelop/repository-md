import React,{useContext, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    ActivityIndicator,

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
    const [itensErrSld, setItensErrSld] = useState([]);
    const [payment,setPayment] = useState('');
    const [load,setLoad] = useState(false);


    const geraPedido = async() =>{

        setLoad(true)
        
        const copyCart = [...cart];
        const copyClient = {...cliente};

        let paramPed = {
            CLIENTE: copyClient,
            CONDPAGTO: payment,
            DESCONTO: '',
            FORCE: 'FALSE',
            ITEMS: copyCart,
            VENDEDOR: vendedor,
            OBSERVATION: txtObs
        }

        await api.post("/prtl003", { body: JSON.stringify(paramPed) })
        .then(async (item) => {
            if (item.data.code == "200") {
                alert('Seu pedido foi enviado com sucesso');
                navigation.navigate('Home')

            } else if(item.data.codigo == "410"){
                setItensErrSld(item.data)
            }
        })
        .catch((err) => {
            //alert("Erro na geração do pedido")
            console.log(err);
            navigation.navigate('Home')
        });

        setLoad(false)
    }

    return( 
        <>
        <SafeAreaView edges={["top"]} style={{ flex: 0, backgroundColor: "#175A93" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",}}
        >
            <View style={{backgroundColor:'#fff',width:'100%',flex:1}}>
                <View style={[styles.headerSales,{marginBottom:30}]}>  
                    <TouchableOpacity onPress={()=>{navigation.navigate('SalePrd',{
                        nameSec:dataBack[0],
                        data:dataBack[1],
                        filter:dataBack[2],
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
                        marginTop:30,
                        marginBottom:50
                    }}
                    onPress={()=>{geraPedido()}}
                >
                    {load 
                        ? <ActivityIndicator color={'#fff'} size={35}/>                        
                        :<Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>Enviar Pedido</Text>
                    }
                </TouchableOpacity>
                
                { itensErrSld.length !== 0 &&
                    <Text style={{color:'tomato'}}>{'*** '+itensErrSld.mensagem+' ***' + '\n\nProdutos: '}</Text>
                }

                <FlatList
                    data={itensErrSld.produtos}
                    renderItem={({item})=>

                    <Text style={{color:'tomato'}}>{item.codigo}</Text>

                    }

                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                />

            </ModObs>
        </SafeAreaView>
        </>
    )
}

