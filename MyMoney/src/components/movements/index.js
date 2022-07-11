import React,{useState} from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';

import typeIcons from '../../utils/typeIcons'
import {numberToReal} from '../../utils/numberToReal';

import styles from './styles';

export default function Movements({icon,type,descri,date,value}){

  return (
    <TouchableOpacity style={[styles.card,{borderColor:type==1?'#E56666':'#3DC94B'}]}>

      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{justifyContent:'space-between',width:'70%'}}>
            <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
              <Image source={typeIcons[icon][0]}/>
              <Text style={{marginHorizontal:5,fontSize:12,color:'#fff',opacity:0.5,}}>{typeIcons[icon][1]}</Text>
            </View>
            <Text style={{fontSize:16,fontWeight:'600',color:'#fff',marginTop:5}}>{descri}</Text>
        </View>
        
        <View style={{justifyContent:'space-between',alignItems:'flex-end'}}>
            <Text style={styles.subTxt}>{date.substring(6,8)+'/'+date.substring(4,6)+'/'+date.substring(0,4)}</Text>

            <View style={{flexDirection:'row',alignItems:'flex-end',marginTop:20}}>
              <Text style={styles.subTxt}>R$ </Text>
              <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}>{(type==1?'-':'')+numberToReal(value)}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
    
  );
}