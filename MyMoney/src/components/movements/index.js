import React,{useState,useContext} from 'react';
import {Text,View,TouchableOpacity,Image,Animated, Alert} from 'react-native';

import typeIcons from '../../utils/typeIcons'
import {numberToReal} from '../../utils/numberToReal';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {Feather} from '@expo/vector-icons';
import {AppContext} from '../../contexts/index'

import styles from './styles';

export default function Movements({item,meses,navigation}){

  const {
    setDateFormatContext,
    setdateFormContext,
    setValueContext,
    setDescriContext,
    setValueChkContext,
    setIconContext
  } = useContext(AppContext)

  const [opacity,setOpacity] = useState(false)

  function LeftActions(progress, dragX){
    
    const scale =  dragX.interpolate({
      inputRange:[0,100],
      outputRange:[0,1],
      extrapolate:'clamp'
    })

    return(
      <View style={{
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'flex-start',
        marginRight:20
      }}>
        <TouchableOpacity onPress={pagarReceber}>
          <Feather name="check-circle" size={30} color='white' />
        </TouchableOpacity>
      </View>
    )
  }

  function pagarReceber(){
    setOpacity(!opacity)
  }


  const openForm = () =>{

    let diaAux = item.date.substring(7,9)
    let mesAux = item.date.substring(4,6)
    let anoAux = item.date.substring(0,4)
    
    setDateFormatContext(item.date.substring(6,8)+'/'+item.date.substring(4,6)+'/'+item.date.substring(0,4))
    setdateFormContext(diaAux+' de '+ meses[parseInt(mesAux)]+' de '+anoAux)
    setValueContext(item.value)
    setDescriContext(item.descri)
    setValueChkContext(item.type)
    setIconContext(item.icon)
    
    navigation.navigate('ModalAdd',{
      idMov:item.id
    })
  
  }

  return (

    <Swipeable 
      renderLeftActions={LeftActions}
    >
      <TouchableOpacity style={[styles.card,{borderColor:item.type==1?'#E56666':'#3DC94B'}]} onPress={openForm}>

        <View style={{flexDirection:'row', justifyContent:'space-between',opacity:opacity?0.2:1}}>
          <View style={{justifyContent:'space-between',width:'70%'}}>
              <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                <Image source={typeIcons[item.icon][0]}/>
                <Text style={{marginHorizontal:5,fontSize:12,color:'#fff',opacity:0.5,}}>{typeIcons[item.icon][1]}</Text>
              </View>
              <Text style={[{fontSize:16,fontWeight:'600',color:'#fff',marginTop:5},opacity&&{textDecorationLine:'line-through'}]}>{item.descri}</Text>
          </View>
          
          <View style={{justifyContent:'space-between',alignItems:'flex-end'}}>
              <Text style={styles.subTxt}>{item.date.substring(6,8)+'/'+item.date.substring(4,6)+'/'+item.date.substring(0,4)}</Text>

              <View style={{flexDirection:'row',alignItems:'flex-end',marginTop:20}}>
                <Text style={styles.subTxt}>R$ </Text>
                <Text style={{fontSize:16,fontWeight:'600',color:'#fff'}}>{(item.type==1?'-':'')+numberToReal(item.value)}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
    
  );
}