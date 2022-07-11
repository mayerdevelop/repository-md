import React,{useEffect,useState,useContext} from 'react';
import {SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {numberToReal,sumTotals} from '../utils/numberToReal';

import Home from '../pages/home';
import SignUp from '../pages/signUp';

import {AppContext} from '../contexts/index'
export default function LoadVerify({navigation}){

  const {
    setNameContext,
    setSaldoContext,
    setGastosContext,
    setHideContext,
    setMonthContext,
    setYearContext,
    setMovementsContext,
  } = useContext(AppContext)

  const [list, setList] = useState([]);
  const [page, setPage] = useState(0); /* 0-signup / 1-home */

  const meses = [null,"Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  useEffect(() => {
    async function nameVerify(){
      //await AsyncStorage.clear()
      const name = await AsyncStorage.getItem('@name')
      const hideStorage = await AsyncStorage.getItem('@hideTotals')
      
      if (name !== null){
        
        const result = await AsyncStorage.getItem('@movements')
        const movements = JSON.parse(result)

        let aEntrada = []
        let aSaida = []
        let nEntrada = 0
        let nSaida = 0

        const data = new Date()
            
        let mes = (data.getMonth()+1).toString().padStart(2, '0')
        let ano = data.getFullYear().toString()
        
        setMonthContext(meses[parseInt(mes)])
        setYearContext(ano)

        let mesAux = meses.indexOf(meses[parseInt(mes)]) + "";

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
                
        setSaldoContext(numberToReal(nEntrada-nSaida))
        setGastosContext(numberToReal(nSaida-0))

        setNameContext(name)
        setHideContext(hideStorage !== null ? hideStorage : 'false')

        setMovementsContext(movements)

        filterDate(movements,meses[parseInt(mes)],ano)
        fSetPage(1)
        
      }else{
        fSetPage(0)
      }
    }
    nameVerify()

  }, [])

  function fSetPage(value){ setPage(value)}


  async function filterDate(mov,newMes,ano){
    const newList = []

    let mes = meses.indexOf(newMes) + "";
    while (mes.length < 2) mes = "0" + mes;

    mov.forEach((item) => {
      if (item.date.substring(0,6) === ano+mes){
        newList.push(item)
      }
    })

    setList(newList)
  }


  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#171719'}}>
      {page === 0 &&
        <SignUp fSetPage={fSetPage} meses={meses}/>
      }
      {page === 1 &&
        <Home filterDate={filterDate} list={list} meses={meses}/>
      }
    </SafeAreaView>
    
  );
}