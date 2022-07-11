import React,{useState,useContext} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

import styles from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {AppContext} from '../../contexts/index'

export default function Totals({}){

  const {saldo,gastos,hideContext} = useContext(AppContext)

  const [hide, setHide] = useState((hideContext === 'false'));

  async function hideTotals(){
    await AsyncStorage.setItem('@hideTotals',String(hide))
    
    setHide(!hide?true:false)
  }

  return (
    <View style={{width:'100%'}}>
      <View style={styles.card}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{marginBottom:15}}>
            <Text style={styles.subVlr}>Saldo</Text>
            
            { !hide ?
              <View style={styles.secVlr}>
                <Text style={[styles.cifrao,{fontSize:18}]}>R$ </Text>
                <Text style={{fontSize:30,color:'#fff',fontWeight:'bold'}}>{saldo}</Text>
              </View>
            :
              <View style={[styles.skeleton,{height:15,width:120,}]} />
            }
          </View>

          <TouchableOpacity onPress={()=>{hideTotals()}}>
            <MaterialCommunityIcons name={!hide?"eye-off":"eye"} size={40} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{alignItems:'flex-end'}}>
          <Text style={styles.subVlr}>Gastos</Text>
          
          { !hide ?
            <View style={styles.secVlr}>
              <Text style={[styles.cifrao,{fontSize:14}]}>R$ </Text>
              <Text style={{fontSize:20,color:'#E56666',fontWeight:'bold'}}>{(parseFloat(gastos)>0?'-':'')+gastos}</Text>
            </View>
          :
            <View style={[styles.skeleton,{height:12,width:80}]} />
          }

        </View>
      </View>
    </View>
  );
}