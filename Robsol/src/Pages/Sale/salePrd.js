import React,{useState, useContext} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

import { RadioButton } from 'react-native-paper';

import _ from 'underscore';

import styles from './styles';

import {decode, encode} from 'base-64';
import typeIcons from '../../utils/typeIcons'
import api from '../../services/api'

import ModFilter from '../../Modal/modFilter'

import {CartContext} from '../../Contexts/cart'

import Section from '../../Components/Sections';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function SalePrd({route,navigation}){

    const { addCart,visibleCart,totalCart } = useContext(CartContext)

    const { nameSec,data,dataUser,filter,dataBack,prdProd } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);
    const [list, setList] = useState(data);
    const [page, setPage] = useState(2);
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [checked, setChecked] = useState(filter);
    const [load, setLoad] = useState(false);

    const authBasic = 'YWRtaW46QVZTSTIwMjI';


    function buttomSearch(option){
        if(searchT){ loadSec() } else { searchSec(option) }

        Keyboard.dismiss()
    };

    const loadSec = async() =>{
        if (searchT){
            setList(data)
            setSearchT(false)
            setSearchText('')
        }
        
        const response = await api.get(`/${nameSec}/`,{
            withCredentials: true,
            headers: {
                'Authorization': 'Basic '+authBasic,
                'VENDEDOR': dataUser.cod_vendedor,
                'page': page,
                'pageSize': 10
            } 
        })

        setList([...list, ...response.data["items"]])
        setPage(page+1)
    };
    
    const searchSec = async(option) =>{
        if (searchText==='') return;

        setListSearch([])
        setList(data)

        let params = {
            'Authorization': 'Basic '+authBasic,
            'VENDEDOR': dataUser.cod_vendedor,
            'ORIGEMAPP': "S",
            'page': 1,
            'pageSize': 2000,
        };

        let opt_new = option.split(":");
        
        switch (opt_new[0]) {
            case "CODIGO":
                params.codigo = opt_new[1];
                break;
            case "DESCRICAO":
                params.descricao = opt_new[1];
                break;
            case "LINHA":
                params.linha = opt_new[1];
                break;
            case "MARCA":
                params.marca = opt_new[1];
                break;
            case "MATERIAL":
                params.material = opt_new[1];
                break;
            case "GENERO":
                params.genero = opt_new[1];
                break;
            default:
                break;
        }

        let aResult = [];

        try{
            setLoad(true)
            const response = await api.get(`/${nameSec}/`,{headers: params})
            if(_.has(response.data,"Erro")){
                aResult = [];
            }else{
                if(response.data.items){
                    response.data["items"].forEach((element, index) => {
                      aResult.push({index: index, ...element});
                    });
                  }else{
                    aResult.push(response.data);
                }
            }
            
        }catch(error){
            alert(error)
        }
        
        setListSearch(aResult)
        setSearchT(true)
        setLoad(false)
    };


    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>
                <View style={styles.headerSales}>  
                    <TouchableOpacity onPress={()=>{addCart([]),totalCart(0),navigation.navigate('SaleCli',{
                        nameSec:dataBack[0],
                        data:dataBack[1],
                        dataUser:dataBack[2],
                        filter:dataBack[3],
                    })}}>
                        <Image source={typeIcons[4]} />
                    </TouchableOpacity>

                    <Text style={{fontSize:24,fontWeight:'bold', color:'#fff'}}>Selecione o Produto</Text>
                </View> 

                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                    />

                    {load ? 
                        <View style={{flex:1,flexDirection:'row',top:5,right:30}}>
                            <ActivityIndicator color={'#000000'} size={30}/>
                        </View>
                        :
                        <TouchableOpacity style={{right:30}} onPress={()=>{buttomSearch(`${checked}:${searchText}`)}}>
                            <Image 
                                style={{resizeMode:'contain', width:30}}
                                source={searchT?typeIcons[32]:typeIcons[6]}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => { setVisibleFilter(true) }}>
                        <Image 
                            style={{resizeMode:'contain', width:30}}
                            source={checked==''?typeIcons[33]:typeIcons[34]}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={searchT 
                        ? listSearch.sort((a, b) => b.id.localeCompare(a.id))
                        : list.sort((a, b) => b.id.localeCompare(a.id))
                    }
                    renderItem={({item})=> 
                        <Section
                            item={item}
                            nameSec={nameSec}
                            vendedor={dataUser.cod_vendedor}
                            prdProd={prdProd}
                        />
                    }

                    onEndReached={searchT?null:loadSec}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Registro não encontrado</Text>
                        </View>
                    }
                />
                
            </View>

            <View style={styles.footerContent}>
                <TouchableOpacity style={styles.imageContent} onPress={()=>{visibleCart(true)}}>
                    <Image style={{resizeMode:'contain',width:35}} source={typeIcons[35]}/>
                    <Text style={styles.titleButtom}>Cart</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.imageContent} onPress={()=>{ }}>
                    <Image style={{resizeMode:'contain',width:35}} source={typeIcons[36]}/>
                    <Text style={styles.titleButtom}>Scan</Text>
                </TouchableOpacity>
            </View>


            <ModFilter visibleFilter={visibleFilter}>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={{ fontSize: 30,color:'#2F8BD8'}}>Filtro</Text>

                        <TouchableOpacity onPress={() => setVisibleFilter(false)}>
                            <Image
                                source={typeIcons[32]}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            
                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:7}}>
                    <View style={{marginVertical:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="CODIGO"
                                status={ checked === 'CODIGO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('CODIGO');setVisibleFilter(false)}}
                            />
                            <Text>Código</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="DESCRICAO"
                                status={ checked === 'DESCRICAO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('DESCRICAO');setVisibleFilter(false)}}
                            />
                            <Text>Descrição</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="LINHA"
                                color='#000'
                                status={ checked === 'LINHA' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('LINHA');setVisibleFilter(false)}}
                            />
                            <Text>Linha</Text>
                        </View>
                    </View>

                    <View style={{marginVertical:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="MARCA"
                                status={ checked === 'MARCA' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('MARCA');setVisibleFilter(false)}}
                            />
                            <Text>Marca</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="MATERIAL"
                                status={ checked === 'MATERIAL' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('MATERIAL');setVisibleFilter(false)}}
                            />
                            <Text>Material</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="GENERO"
                                status={ checked === 'GENERO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('GENERO');setVisibleFilter(false)}}
                            />
                            <Text>Gênero</Text>
                        </View>
                    </View>
                </View>
            </ModFilter>

        </SafeAreaView>
        
    )
}
