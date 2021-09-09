import React,{useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';

import styles from './styles';

import {decode, encode} from 'base-64';

import api from '../../services/api'

import search from '../../assets/search.png';
import close from '../../assets/close.png';

import Footer from '../../Components/Footer';
import Section from '../../Components/Sections';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function Detail({route,navigation}){

    const { nameSec,data,dataUser } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);

    const [list, setList] = useState(data);
    const [page, setPage] = useState(2);

    const loadProd = async() =>{

        if (searchT){
            setList(data)
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


    const loadLoja = async() =>{

        if (searchT){
            setList(data)
            setSearchT(false)
            setSearchText('')
        }
        
        const response = await api.get(`/lojas/${page}`,{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} 
        })

        setList([...list, ...response.data])
        setPage(page+1)
    };

    const searchLoja = async() =>{
        if (searchText==='') return;
        
        const response = await api.get(`/searchloja/${searchText}`,{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} 
        })

        setListSearch(response.data)
        setSearchT(true)
    };


    function buttomSearch (){
        if(nameSec==='Produtos'){
            if(searchT){ loadProd() } else { searchProd() }

        } else if (nameSec==='Lojas'){
            if(searchT){ loadLoja() } else { searchLoja() }
        }
    }

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
                                item={item}
                                nameSec={nameSec}
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
                    />
                }

                { nameSec === 'Lojas' &&

                    <FlatList
                        data={searchT?listSearch:list}
                        renderItem={({item})=> 
                            <Section
                                item={item}
                                nameSec={nameSec}
                            />
                        }
                        onEndReached={searchT?null:loadLoja}
                        onEndReachedThreshold={0.1}
                        keyExtractor={ item => item.id}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>Registro não encontrado</Text>
                            </View>
                    }
                    />

                }
                
            </View>
            
            <Footer navigation={navigation} dataUser={dataUser} backPage={'Detail'}/>
        </SafeAreaView>
        
    )
}

