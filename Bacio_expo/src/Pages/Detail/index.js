import React,{useState} from 'react';
import {SafeAreaView,View,Text,Image,TouchableOpacity,TextInput, FlatList} from 'react-native';
import styles from './styles';

import {decode, encode} from 'base-64';

import api from '../../services/api'

import search from '../../assets/search.png';
import close from '../../assets/close.png';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import Footer from '../../Components/Footer';
import Section from '../../Components/Sections';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function Detail({route,navigation}){

    const { nameSec,prods } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);

    const [list, setList] = useState(prods);
    const [page, setPage] = useState(2);

    const loadProd = async() =>{

        if (searchT){
            setList(prods)
            setSearchT(false)
            setSearchText('')
        }
        
        const response = await api.get(`/produtos/${page}`,{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} 
        })

        setList([...list, ...response.data])
        setPage(page+1)
    };
    
    const searchProd = async() =>{
        if (searchText==='') return;
        
        const response = await api.get(`/searchprod/${searchText}`,{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} 
        })

        setListSearch(response.data)
        setSearchT(true)
    };


    const buttomSearch = ()=>{
        if(nameSec==='Produtos'){
            searchT?loadProd:searchProd

        } else if (nameSec==='Clientes'){
            alert(nameSec)
        }

    };

    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>

                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                    />

                    <TouchableOpacity onPress={buttomSearch}>
                        <Image source={searchT?close:search}/>
                    </TouchableOpacity>
                </View>
                
                { nameSec==='Produtos' &&
                <FlatList
                    data={searchT?listSearch:list}
                    renderItem={({item})=> 
                        <Section 
                            key={item.codigo.substr(0,26)}
                            id={item.codigo.substr(0,26)} 
                            name={item.descricao.substr(0,50)}
                            onPress={()=>{
                                navigation.navigate('DetailProd',{
                                    codigo:item.codigo.substr(0,26),
                                    descricao:item.descricao.substr(0,50),
                                    tipo:item.tipo,
                                    unidmed:item.unidmed,
                                    armazem:item.armazem,
                                    grupo:item.grupo,
                                })
                            }}
                        />
                    }

                    onEndReached={searchT?null:loadProd}
                    onEndReachedThreshold={0.1}
                    keyExtractor={ item => item.codigo}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Registro não encontrado</Text>
                        </View>
                    }
                />}
                
            </View>
            
            <Footer navigation={navigation} />
        </SafeAreaView>
        
    )
}

