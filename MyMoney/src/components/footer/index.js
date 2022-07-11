import React,{useContext} from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

import {Fontisto,FontAwesome5} from '@expo/vector-icons';
import {AppContext} from '../../contexts/index'
import ModalDropdown from 'react-native-modal-dropdown';

import styles from './styles';

export default function Footer({handleOpen,setShowMode}){

    const {month,year} = useContext(AppContext)


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

            <TouchableOpacity style={styles.elipseAdd} onPress={()=>{handleOpen()}}>
                <FontAwesome5 name="plus-circle" size={65} color="#5E57B2" />
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center'}}>
                <Fontisto style={{marginBottom:3}} name="pie-chart-1" size={35} color="white" />
                <Text style={styles.titleButtom}>Gráficos</Text>
            </TouchableOpacity>
        </View>
    )
}