import React from 'react';
import {SafeAreaView,Text,View,ScrollView,TouchableOpacity} from 'react-native';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import styles from './StyleProd';

export default function DetailProd({route,navigation}){

    const {codigo,descricao,tipo,unidmed,armazem,grupo} = route.params

    return( 
        
        <SafeAreaView style={styles.container}>

            <Header 
                showBack={true} 
                showSearch={false} 
                backPage={'Detail'} 
                navigation={navigation}
            />

            <Text style={styles.TextTitle}>Detalhes</Text>

            <ScrollView style={styles.contScrow}>

                <Text style={styles.cardTitle1}>Código</Text>
                <TouchableOpacity style={styles.content1}>
                    <Text style={styles.cardDesc1}>{codigo}</Text>
                </TouchableOpacity>
            
                <Text style={styles.cardTitle1}>Descrição</Text>
                <TouchableOpacity style={styles.content1}>
                    <Text style={styles.cardDesc1}>{descricao}</Text>  
                </TouchableOpacity>
                
                <View style={styles.content2}>
                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Tipo</Text>
                        <TouchableOpacity style={styles.card2}>
                            <Text style={styles.cardDesc2}>{tipo}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContent2}>
                        <Text style={styles.cardTitle2}>Un Medida</Text>
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