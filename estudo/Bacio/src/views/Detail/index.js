import React,{useState, useEffect} from 'react';
import {SafeAreaView,Text,View,ScrollView,ActivityIndicator} from 'react-native';
import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Section from '../../components/Sections';

export default function Detail({navigation}){

    const nameSec = navigation.getParam('clasId', 'NO-ID')
    const prods = navigation.getParam('prods', 'NO-ID')

    return( 
        
        <SafeAreaView style={[{backgroundColor:'#fff',flex: 1},styles.container]}>
            <Header showBack={true} showBell={false} showSearch={true} backPage={'Home'} navigation={navigation}/>
            <Text style={styles.TextTitle}>{nameSec}
            </Text>

            <ScrollView style={{marginBottom:220,top:100}}>
                <View style={{flex:1}}>

                    { nameSec == 'Produtos' && prods.map(p=>(
                            <Section 
                                id={p.codigo.substr(0,26)} 
                                name={p.descricao.substr(0,50)}
                                onPress={()=>{
                                    navigation.navigate('DetailProd',{
                                        prods:prods,
                                        clasId:nameSec,
                                        codigo:p.codigo.substr(0,26),
                                        descricao:p.descricao.substr(0,50),
                                        tipo:p.tipo,
                                        unidmed:p.unidmed,
                                        armazem:p.armazem,
                                        grupo:p.grupo})
                                    }}
                            />
                        ))
                    }

                </View>
            </ScrollView>
            <Footer navigation={navigation} icon={'add'} onPress={()=>{navigation.navigate('Home')}}/>
        </SafeAreaView>
        
    )
}