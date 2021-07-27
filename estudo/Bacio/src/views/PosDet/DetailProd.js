import React,{useState, useEffect} from 'react';
import {SafeAreaView,Text,View,ScrollView,TouchableOpacity} from 'react-native';
import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DetailProd({navigation}){

    const nameSec = navigation.getParam('clasId', 'NO-ID')
    const prods = navigation.getParam('prods', 'NO-ID')

    return( 
        
        <SafeAreaView style={styles.container}>
            <Header showBack={true} showBell={false} showSearch={false} backPage={'Detail'} navigation={navigation}/>
            <Text style={styles.TextTitle}>Detalhes</Text>

            <ScrollView style={{marginBottom:70,top:100,marginBottom:170}}>
                <Text style={styles.cardTitle1}>Código</Text>
                
                <View style={styles.content1}>
                    <TouchableOpacity style={styles.card1}>
                        <Text style={styles.cardDesc1}>{navigation.getParam('codigo', 'NO-ID')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.cardTitle3}>Descrição</Text>
                <View style={styles.content3}>
                    <View style={styles.card3}>
                        <Text style={styles.cardDesc3}>{navigation.getParam('descricao', 'NO-ID')}</Text>
                        
                    </View>
                </View>
                <View style={styles.content2}>
                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Tipo</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{navigation.getParam('tipo', 'NO-ID')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Unid Medida</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{navigation.getParam('unidmed', 'NO-ID')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content2}>
                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Armazém</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{navigation.getParam('armazem', 'NO-ID')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Grupo</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{navigation.getParam('grupo', 'NO-ID')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation} icon={'check'} onPress={()=>{navigation.navigate('Detail',{clasId:nameSec,prods:prods})}}/>
        </SafeAreaView>
        
    )
}