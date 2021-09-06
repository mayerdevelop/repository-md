import React,{useState,useEffect} from 'react';
import {SafeAreaView,Text,View,ScrollView,ActivityIndicator,Image,TouchableOpacity,TextInput} from 'react-native';
import styles from './styles';

import {decode, encode} from 'base-64'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Section from '../../Components/Sections';

import backpage from '../../assets/backpage.png';
import nextpage from '../../assets/nextpage.png';

import api from '../../services/api'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Detail({route,navigation}){

    const { nameSec,prods,showBackPage,numPage,nameUser } = route.params;

    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(prods);

    const [load, setLoad] = useState(false);
    const [limitpg,setLimitepg] = useState(true);
    
    const nextPage = async() =>{
        numNextPage = numPage+1
        
        setLoad(true)
        
        try{
            const response = await api.get(`/produtos/${numNextPage}`,{
                withCredentials: true,
                headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} })
                
                setList(response.data);
                setLoad(false)
                navigation.navigate('Detail',{
                    clasId:'Produtos',
                    prods:response.data,
                    numPage:numNextPage,
                    showBackPage:true,
                    nameUser:nameUser
                })
                
        } catch(error){
            alert('Não há itens para a busca!')
            setLoad(false)
            setLimitepg(false)
        }
    };


    const BackPage = async() =>{
        numNextPage = numPage-1

        setLimitepg(true)
        setLoad(true)
        try{
            const response = await api.get(`/produtos/${numNextPage}`,{
                withCredentials: true,
                headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} })
                
                setList(response.data);
                setLoad(false)
                navigation.navigate('Detail',{
                    clasId:'Produtos',
                    prods:response.data,
                    numPage:numNextPage,
                    showBackPage:numNextPage == 1 ? false : true,
                    nameUser:nameUser
                })

        } catch(error){
            alert(error)
            setLoad(false)
        }
    };


    useEffect(() => {
        if (searchText === '') {
          setList(prods);
        } else {
          setList(
            prods.filter(
              (item) =>
                item.descricao.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                
            )
          );
        }
      }, [searchText]);

    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>

                <View style={styles.searchArea}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                    />
                </View>

                <ScrollView>
                    <View style={styles.contScrow}>

                        { nameSec == 'Produtos' && list.map(p=>(
                            <Section 
                                key={p.codigo.substr(0,26)}
                                id={p.codigo.substr(0,26)} 
                                name={p.descricao.substr(0,50)}
                                onPress={()=>{
                                    navigation.navigate('DetailProd',{
                                        prods:list,
                                        clasId:nameSec,
                                        codigo:p.codigo.substr(0,26),
                                        descricao:p.descricao.substr(0,50),
                                        tipo:p.tipo,
                                        unidmed:p.unidmed,
                                        armazem:p.armazem,
                                        grupo:p.grupo,
                                        numPage:numPage
                                    })
                                }}
                            />
                        ))}

                    </View>

                    <View Style={styles.contPage}>
                        <View style={styles.subContPage}>

                            { showBackPage ?
                                <TouchableOpacity onPress={BackPage}>
                                    <Image source={backpage}/>
                                </TouchableOpacity>
                            : <View/> }

                            {load ?
                                <ActivityIndicator color={'#723600'} size={20}/> 
                                : <Text style={styles.textNPage}>{numPage}</Text>
                            }
                            <TouchableOpacity onPress={nextPage}>
                                { limitpg ? <Image source={nextpage}/> : <View/> }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            
            <Footer navigation={navigation} />
        </SafeAreaView>
        
    )
}