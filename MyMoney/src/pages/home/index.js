import React, {useState,useContext,useRef } from 'react';
import {Text,View,SafeAreaView,FlatList,TouchableOpacity,Image,ScrollView,TextInput,useWindowDimensions} from 'react-native';

import styles from './styles';
import {Ionicons} from '@expo/vector-icons';
import typeIcons from '../../utils/typeIcons';

import Totals from '../../components/totals/index'
import Movements from '../../components/movements/index'
import Footer from '../../components/footer';

import {AppContext} from '../../contexts/index'
import {Modalize} from 'react-native-modalize';
import {RadioButton} from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-modern-datepicker';
import ModPreview from '../../modal/modPreview';

import {numberToReal,sumTotals} from '../../utils/numberToReal';


export default function Home({filterDate,list,meses}){

  const window = useWindowDimensions();

  const modalizeRef = useRef(null);
  const {
    name,
    setSaldoContext,
    setGastosContext,
    setMonthContext,
    month,
    year,
    setYearContext,
    movements,
    setMovementsContext
  } = useContext(AppContext)

  const [type, setType] = useState();
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState('saida');
  const [dateFormat, setDateFormat] = useState('Selecione a data');
  const [descri, setDescri] = useState('');
  const [mode, setMode] = useState('calendar');
  const [visiblePreview, setVisiblePreview] = useState(false);


  const onChangeDate = (value,type) => {

    if(type === 'calendar'){
      let diaAux = value.substring(8,10)
      let mesAux = value.substring(5,7)
      let anoAux = value.substring(0,4)

      let mes = meses[parseInt(mesAux)]
      let ano = anoAux

      setMonthContext(mes)
      setYearContext(ano)

      setDateFormat(diaAux+'/'+mesAux+'/'+anoAux)

    } else if(type === 'monthYear'){
      
      let mes = meses[parseInt(value.substring(5,8))]
      let ano = value.substring(0,4)

      setMonthContext(mes)
      setYearContext(ano)

      filterDate(movements,mes,ano)
      fSaldoGasto(movements,mes,true,ano)

    }
    setVisiblePreview(false)
  };

  const saveMovement = async() =>{

    let lRet = true
    let cMsg = ''
    let entsaid = checked === 'entrada' ? 0 : 1
    let dateMovement = dateFormat.substring(6,10)+dateFormat.substring(3,5)+dateFormat.substring(0,2)

    if(value === 0 && lRet){lRet = false, cMsg = 'Valor não informado'}
    if(dateFormat === 'Selecione a data' && lRet){lRet = false, cMsg = 'Data não informada'}
    if(descri === '' && lRet){lRet = false, cMsg = 'Descrição não informada'}
    if(type === null && lRet){lRet = false, cMsg = 'Tipo não informado (Ícone)'}

    let id = 0
    let idItem = await AsyncStorage.getItem('@iditem')

    if(idItem === '0'){
      id = 1
      await AsyncStorage.setItem('@iditem',id.toString())
    }else {
      id = parseInt(idItem)+1
      await AsyncStorage.setItem('@iditem',id.toString())
    }

    if(lRet){
      let newMovement = {
        id:id.toString(),
        icon:type,
        type:entsaid,
        date: dateMovement,
        descri:descri,
        value:value
      }

      let response = await AsyncStorage.getItem('@movements')
      
      if (response){
        const copyResponse = JSON.parse(response)
        copyResponse.push(newMovement)
        handleClose()
        await AsyncStorage.setItem('@movements',JSON.stringify(copyResponse))

        setMovementsContext(copyResponse)
        filterDate(copyResponse,month,year)

      }else{
        handleClose()
        await AsyncStorage.setItem('@movements',JSON.stringify([newMovement]))
        
        filterDate([newMovement],month,year)
        setMovementsContext([newMovement])
      }

      const result = await AsyncStorage.getItem('@movements')
      const movements = JSON.parse(result)

      fSaldoGasto(movements,month,false,year)

    } else {
      alert(cMsg)
    }

  }

  const clearForm = () =>{
    setDateFormat('Selecione a data')
    setChecked('saida')
    setValue(0)
    setType(null)
    setDescri('')
  }


  function fSaldoGasto(movements,newMes,lmuda,ano){
    let aEntrada = []
    let aSaida = []
    let nEntrada = 0
    let nSaida = 0

    let mesAux = meses.indexOf(newMes) + "";

    while (mesAux.length < 2) mesAux = "0" + mesAux;
    
    movements.forEach((item) => {
      if (item.date.substring(0,6) === ano+mesAux){
        if (item.type === 0){
          aEntrada.push(item)
        }else {
          aSaida.push(item)
        }
      }
    })
    
    if (aEntrada.length > 0){
      nEntrada = sumTotals(aEntrada, ',').replace(',','.')
    }else{
      nEntrada = 0
    }

    if (aSaida.length > 0){
      nSaida = sumTotals(aSaida, ',').replace(',','.')
    }else{
      nSaida = 0
    }
    
    if (nEntrada > 0 || lmuda){setSaldoContext(numberToReal(nEntrada-nSaida))}
    if (nSaida > 0 || lmuda) {setGastosContext(numberToReal(nSaida-0))}
}


  function setShowMode(value){
    setMode(value)
    setVisiblePreview(true)
  }

  const handleOpen = ()=>{modalizeRef.current?.open(),clearForm()};
  const handleClose = ()=>{modalizeRef.current?.close(),clearForm()};


  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginHorizontal:10,width:'94%',flex:1,marginBottom:120}}>
        
        <View style={{width:'100%',marginVertical:25}}>
          <Text style={styles.name}>{'Olá, '+name}</Text>
        </View>

        <Totals/>

        <View style={{width:'100%', marginTop:30,marginBottom:15}}>
          <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>Ultimas Movimentações</Text>
        </View>

        <FlatList
          data={list.sort((a, b) => b.date.localeCompare(a.date))}
          keyExtractor={(item) => item.id}
          renderItem={({item})=> 
            <Movements 
              icon={item.icon}
              type={item.type}
              descri={item.descri}
              date={item.date}
              value={item.value}
            />
          }
        />

      </View>

      <Modalize
        adjustToContentHeight={560}
        ref={modalizeRef}
        snapPoint={560}
        withHandle={false}
      >
        <View style={styles.modalContainer}>
            
          <View style={styles.headerModal}>
            <Text style={{fontSize:18, fontWeight:'600',color:'#fff'}}>Registrar Movimento</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons style={{bottom:7}} name="close" size={40} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            { typeIcons.map((icon, index) => ( 
              icon[0] !== null &&
              <View key={index} style={{alignItems:'center'}}>
                <TouchableOpacity
                  onPress={()=>setType(index)}
                  style={styles.typeIcon}
                >
                  <Image style={type && type != index && styles.typeOff} source={icon[0]} />
                </TouchableOpacity>
                <Text style={{color:'white',marginTop:5}}>{icon[1]}</Text>
              </View>
        

            ))}
          </ScrollView>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:40}}>
              <CurrencyInput
                value={value}
                onChangeValue={setValue}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                minValue={0}
                style={{
                  borderBottomWidth:1.5,
                  borderColor:'#fff',
                  opacity:0.5,
                  width:'48%',
                  fontWeight:'700',
                  fontSize:18,
                  color:'#fff',
                }}
              />

              <View style={{opacity:0.5,width:'48%',borderBottomWidth:1.5,borderColor:'#fff'}}>
                <TouchableOpacity onPress={()=>{setShowMode('calendar')}}>
                    <Text style={{fontWeight:'700',fontSize:18,color:'#fff'}}>{dateFormat}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput 
              style={{
                borderBottomWidth:1.5,
                borderColor:'#fff',
                opacity:0.5,
                width:'100%',
                fontWeight:'700',
                fontSize:18,
                color:'#fff',
                marginBottom:60,
              }}
              placeholder={'Descrição'}
              placeholderTextColor={'#fff'}
              maxLength={30}
              onChangeText={setDescri}
              value={descri}
            />


            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Entrada</Text>

                <View style={styles.elipseCheck}>
                  <RadioButton
                    value="entrada"
                    status={checked === 'entrada' ? 'checked' : 'unchecked'}
                    onPress={() => { setChecked('entrada') }}
                    uncheckedColor='#232229'
                    color='#5E57B2'
                  />
                </View>
              </View>

              <View style={{alignItems:'center'}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>Saída</Text>
                
                <View style={styles.elipseCheck}>
                  <RadioButton
                    value="saida"
                    status={checked === 'saida' ? 'checked' : 'unchecked'}
                    onPress={() => { setChecked('saida')}}
                    uncheckedColor='#232229'
                    color='#5E57B2'
                  />
                </View>
              </View>
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
      </Modalize>

      <ModPreview visiblePreview={visiblePreview}>
        <DatePicker
          options={{
            backgroundColor: '#171719',
            textHeaderColor: '#5E57B2',
            textDefaultColor: '#fff',
            selectedTextColor: '#fff',
            mainColor: '#5E57B2',
            textSecondaryColor: '#5E57B2',
          }}
          mode={mode}
          minuteInterval={30}
          style={{ borderRadius: 10 }}
          onDateChange={value => onChangeDate(value,'calendar')}
          onMonthYearChange={value => onChangeDate(value,'monthYear')}
        />
      </ModPreview>
      
      <Footer 
          handleOpen={handleOpen} 
          movements={movements} 
          fSaldoGasto={fSaldoGasto}
          filterDate={filterDate} 
          setShowMode={setShowMode}
        />

    </SafeAreaView>
    
  );
}