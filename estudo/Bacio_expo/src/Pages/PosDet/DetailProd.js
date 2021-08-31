import React,{useState, useEffect} from 'react';
import {SafeAreaView,Text,View,ScrollView,TouchableOpacity} from 'react-native';
import styles from './styles';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

export default function DetailProd({route,navigation}){

    const {nameSec,nameUser,prods,numPage,codigo,descricao,tipo,unidmed,armazem,grupo} = route.params

    return( 
        
        <SafeAreaView style={styles.container}>
            <Header showBack={false} showBell={false} showSearch={false} backPage={'Detail'} navigation={navigation}/>
            <Text style={styles.TextTitle}>Detalhes</Text>

            <ScrollView style={{top:80,marginBottom:200}}>
                <Text style={styles.cardTitle1}>Código</Text>
                
                <View style={styles.content1}>
                    <TouchableOpacity style={styles.card1}>
                        <Text style={styles.cardDesc1}>{codigo}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.cardTitle3}>Descrição</Text>
                
                <View style={styles.content3}>
                    <View style={styles.card3}>
                        <Text style={styles.cardDesc3}>{descricao}</Text>
                        
                    </View>
                </View>
                
                <View style={styles.content2}>
                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Tipo</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{tipo}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Unid Medida</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{unidmed}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content2}>
                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Armazém</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{armazem}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Grupo</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{grupo}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} icon={'check'} />
        </SafeAreaView>
        
    )
}