import React, {useState,useContext } from 'react';
import {Text,View,TouchableOpacity,Image,ScrollView,TextInput,Switch,StyleSheet} from 'react-native';

import {Ionicons,Feather,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons';
import typeIcons from '../utils/typeIcons';

import {AppContext} from '../contexts/index'
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';


export default function ModalAdd({ navigation,route }) {

  const {
    setValueChkContext,
    valueChk,
    setDateFormatContext,
    setdateFormContext,
    dateForm,
    setValueContext,
    value,
    setDescriContext,
    descri,
    month,
    year,
    setMovementsContext,
    dateFormat,
    fSaldoGasto,
    setShowMode,
    filterDate,
    setIconContext,
    icon
  } = useContext(AppContext)


  const {idMov} = route.params;

  const [pago, setPago] = useState(false);
  const tggPago = () => setPago(previousState => !previousState);

  const [repetir, setRepetir] = useState(false);
  const tggRepetir = () => setRepetir(previousState => !previousState);

  const clearForm = () =>{
    setDateFormatContext('Selecione a data')
    setdateFormContext('Selecione a data')
    setValueChkContext(1)
    setValueContext(0)
    setIconContext(null)
    setDescriContext('')
    setPago(true)
    setRepetir(false)
  }

  const saveMovement = async() =>{
    
    let lMuda = false
    let lRet = true
    let cMsg = ''
    let dateMovement = dateFormat.substring(6,10)+dateFormat.substring(3,5)+dateFormat.substring(0,2)

    if(value === 0 && lRet){lRet = false, cMsg = 'Valor não informado'}
    if(dateFormat === 'Selecione a data' && lRet){lRet = false, cMsg = 'Data não informada'}
    if(descri === '' && lRet){lRet = false, cMsg = 'Descrição não informada'}
    if(icon === null && lRet){lRet = false, cMsg = 'Tipo não informado (Ícone)'}
    
    let id = 0
    let idItem = await AsyncStorage.getItem('@iditem')

    if(parseInt(idMov) > 0){ 
      id = parseInt(idMov)
    }else{
      if(idItem === '0'){
        id = 1
        await AsyncStorage.setItem('@iditem',id.toString())
      }else {
        id = parseInt(idItem)+1
        await AsyncStorage.setItem('@iditem',id.toString())
      }
    }

    if(lRet){
      let newMovement = {
        id:id.toString(),
        icon:icon,
        type:valueChk,
        date: dateMovement,
        descri:descri,
        value:value
      }

      let response = await AsyncStorage.getItem('@movements')
      
      if (response){
        const copyResponse = JSON.parse(response)

        if(parseInt(idMov) > 0){ 

          for (var i = 0; i < copyResponse.length; i++) {
            var obj = copyResponse[i];
            if (obj.id == idMov) {
                obj.id = id.toString(),
                obj.icon = icon,
                obj.type = valueChk,
                obj.date = dateMovement,
                obj.descri = descri,
                obj.value = value
                break;
            }
          }
          navigation.goBack()
          clearForm()
          await AsyncStorage.setItem('@movements',JSON.stringify(copyResponse))

          setMovementsContext(copyResponse)
          filterDate(copyResponse,month,year)
          lMuda = true

        }else{
          copyResponse.push(newMovement)
          navigation.goBack()
          clearForm()
          await AsyncStorage.setItem('@movements',JSON.stringify(copyResponse))
  
          setMovementsContext(copyResponse)
          filterDate(copyResponse,month,year)
        }




      }else{
        navigation.goBack()
        clearForm()
        await AsyncStorage.setItem('@movements',JSON.stringify([newMovement]))
        
        filterDate([newMovement],month,year)
        setMovementsContext([newMovement])
      }

      const result = await AsyncStorage.getItem('@movements')
      const movements = JSON.parse(result)

      fSaldoGasto(movements,month,lMuda,year)

    } else {
      alert(cMsg)
    }

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start',backgroundColor:'#171719',paddingVertical:15 }}>
        <View style={styles.headerModal}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <SelectDropdown
              data={['Entrada','Saída']}
              defaultValueByIndex={valueChk}
              onSelect={(selectedItem, index) => {setValueChkContext(index) }}
              buttonStyle={{backgroundColor: valueChk === 1 ?'#E56666':'#3DC94B',borderRadius:10,width:'40%',height:40}}
              buttonTextStyle={{color:'#FFF',textAlign:'center',fontWeight:'bold',fontSize:20}}
              renderDropdownIcon={open => {return <FontAwesome name={open?'chevron-up':'chevron-down'} color={'#FFF'} size={18} style={{left:5}} />}}
              dropdownIconPosition={'right'}
              dropdownStyle={{borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}
              rowStyle={{backgroundColor: '#444'}}
              rowTextStyle={{color:'#FFF',textAlign:'center',fontWeight:'bold'}}
            />

            <TouchableOpacity onPress={() => {navigation.goBack(),clearForm()}}>
              <Ionicons style={{bottom:7}} name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection:'row',
            alignItems:'flex-end',
            bottom:10,
            position:'absolute',
            paddingHorizontal:20,
          }}>
            <Text style={{color:'#fff',opacity:0.5,fontSize:20,fontWeight:'600',bottom:3}}>R$</Text>
            <CurrencyInput
                value={value}
                onChangeValue={setValueContext}
                delimiter="."
                separator=","
                precision={2}
                minValue={0}
                style={{
                  fontWeight:'700',
                  fontSize:30,
                  color:'#fff',
                  marginHorizontal:5
                }}
              />
            </View>
        </View>

        <View style={{
          borderRadius:10,
          backgroundColor:'#232229',
          width:'100%',
          flex:1,
        }}>
          
          <View style={{
            flexDirection:'row',
            marginBottom:20,
            marginTop:10,
            padding:20
          }}>
            <Feather name="calendar" size={24} color="white" />
            <TouchableOpacity onPress={()=>{setShowMode('calendar')}}>
                <Text style={{fontWeight:'600',fontSize:24,color:'#fff',marginHorizontal:12}}>{dateForm}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{maxHeight:'15%'}}>
            { typeIcons.map((item, index) => ( 
              item[0] !== null &&
              <View key={index} style={{alignItems:'center'}}>
                <TouchableOpacity
                  onPress={()=>setIconContext(index)}
                  style={styles.typeIcon}
                >
                  <Image style={icon && icon != index && styles.typeOff} source={item[0]} />
                </TouchableOpacity>
                <Text style={{color:'white',marginTop:5}}>{item[1]}</Text>
              </View>
            ))}
          </ScrollView>
          
          <ScrollView showsVerticalScrollIndicator={false} style={{padding:20}}>
            <View style={{
              flexDirection:'row',
              borderBottomWidth:0.2,
              borderColor:'#fff',
              marginBottom:30,
              paddingVertical:10
            }}>

              <MaterialCommunityIcons name="lead-pencil" size={24} color="white" />

              <TextInput 
                style={{
                  opacity:0.5,
                  width:'100%',
                  fontWeight:'700',
                  fontSize:18,
                  color:'#fff',
                  marginHorizontal:10,
                }}
                placeholder={'Descrição...'}
                placeholderTextColor={'#fff'}
                maxLength={30}
                onChangeText={setDescriContext}
                value={descri}
              />
            </View>

            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              borderBottomWidth:0.2,
              borderColor:'#fff',
              paddingVertical:10,
              marginBottom:30,
            }}>
              
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Feather name="check-circle" size={24} color="white" />
                
                <Text style={{fontSize:18,fontWeight:'600',color:'#fff',marginHorizontal:10}}>
                  {valueChk === 1 ? 'Pago': 'Recebido'}
                </Text>
              </View>

              <Switch
                trackColor={{ false: "#767577", true: valueChk === 1 ?'#E56666':'#3DC94B' }}
                thumbColor={pago ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={tggPago}
                value={pago}
              />
            </View>

            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              borderBottomWidth:0.2,
              borderColor:'#fff',
              paddingVertical:10,
              marginBottom:30
            }}>
              
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Ionicons name="reload-sharp" size={24} color="white" />
                
                <Text style={{fontSize:18,fontWeight:'600',color:'#fff',marginHorizontal:10}}>
                  Repetir
                </Text>
              </View>

              <Switch
                trackColor={{ false: "#767577", true: '#DCB11B' }}
                thumbColor={repetir ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={tggRepetir}
                value={repetir}
              />
            </View>

            <TouchableOpacity
              style={{
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#5E57B2',
                marginHorizontal:100,
                height:40,
                borderRadius:10,
                marginTop:60
              }}
              onPress={()=>{saveMovement()}}
            >
              <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Salvar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({

  headerModal: {
    width:'100%',
    height:130,
    paddingHorizontal:20
  },

  typeIcon:{
    backgroundColor:'#5E57B2',
    width:50,
    height:50,
    borderRadius:50/2,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:12
  },

  typeOff:{
    opacity:0.5
  },


});