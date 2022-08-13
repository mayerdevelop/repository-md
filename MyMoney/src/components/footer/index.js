import React,{useContext} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

import {FontAwesome5} from '@expo/vector-icons';
import {AppContext} from '../../contexts/index'

import PieDark from '../../assets/@svg/pie_dark.svg'

import styles from './styles';

export default function Footer({setShowMode,navigation}){

    const {month,year} = useContext(AppContext)
    

    const Teste = [<PieDark style={{marginBottom:2}} width={38} height={38} />]


    return(
        <View style={styles.footerContent}>
            <TouchableOpacity onPress={()=>setShowMode('monthYear')}>
                <View style={styles.calendIco}>
                    <View style={styles.yearCalend}>
                        <Text style={styles.txtYearCalend}>{year}</Text>
                    </View>
                    <Text style={styles.txtMonthCalend}>{month.substring(0,3).toUpperCase()}</Text>
                </View>
                <Text style={styles.titleButtom}>Período</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.elipseAdd} onPress={()=> navigation.navigate('ModalAdd',{idMov:'0'})}>
                <FontAwesome5 name="plus-circle" size={65} color="#5E57B2" />
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}>
                {Teste[0]}
                <Text style={styles.titleButtom}>Gráficos</Text>
            </TouchableOpacity>
        </View>
    )
}