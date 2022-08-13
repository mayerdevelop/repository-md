import React, {useContext} from 'react';
import {Text,View,SafeAreaView,FlatList} from 'react-native';

import styles from './styles';
import Totals from '../../components/totals/index'
import Movements from '../../components/movements/index'
import Footer from '../../components/footer';

import {AppContext} from '../../contexts/index'
import DatePicker from 'react-native-modern-datepicker';
import ModPreview from '../../modal/modPreview';


export default function Home({meses,navigation}){

  const {
    name,
    setMonthContext,
    setYearContext,
    movements,
    setDateFormatContext,
    setdateFormContext,
    filterDate,
    list,
    fSaldoGasto,
    setShowMode,
    visiblePreview,
    setVisiblePreviewContext,
    mode
  } = useContext(AppContext)


  const onChangeDate = (receive,typeCalend) => {

    if(typeCalend === 'calendar'){
      let diaAux = receive.substring(8,10)
      let mesAux = receive.substring(5,7)
      let anoAux = receive.substring(0,4)

      let mes = meses[parseInt(mesAux)]
      let ano = anoAux

      setMonthContext(mes)
      setYearContext(ano)

      setDateFormatContext(diaAux+'/'+mesAux+'/'+anoAux)
      setdateFormContext(diaAux+' de '+ meses[parseInt(mesAux)]+' de '+anoAux)
      

    } else if(typeCalend === 'monthYear'){
      
      let mes = meses[parseInt(receive.substring(5,8))]
      let ano = receive.substring(0,4)

      setMonthContext(mes)
      setYearContext(ano)

      filterDate(movements,mes,ano)
      fSaldoGasto(movements,mes,true,ano)

    }
    setVisiblePreviewContext(false)
  };


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
              item={item}
              meses={meses}
              navigation={navigation}
            />
          }
        />
      </View>

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
      
      <Footer setShowMode={setShowMode} navigation={navigation}/>

    </SafeAreaView>
    
  );
}