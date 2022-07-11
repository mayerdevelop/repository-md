import React,{useState,useEffect,useContext} from 'react';
import {Text,View,TouchableOpacity,TextInput,Keyboard,SafeAreaView} from 'react-native';

import styles from './styles';

import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../contexts/index'

export default function SignUp({fSetPage,meses}){

  const [showKeyboard,setShowKeyboard] = useState(false)
  const [name, setName] = useState('')

  const {
    setNameContext,
    setMonthContext,
    setYearContext,
    setMovementsContext
  } = useContext(AppContext)

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowKeyboard(true)
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  const fComeca = async() =>{
    if (!name) {
      alert('Necessário preencher um nome')

    }else{
      setNameContext(name.toLowerCase())

      const data = new Date()
            
      let mes = (data.getMonth()+1).toString().padStart(2, '0')
      let ano = data.getFullYear().toString()
      
      setMonthContext(meses[parseInt(mes)])
      setYearContext(ano)
      setMovementsContext([])

      await AsyncStorage.setItem('@name',name.toLowerCase())
      await AsyncStorage.setItem('@movements',JSON.stringify([]))
      await AsyncStorage.setItem('@iditem','0')
      
      fSetPage(1)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      
      { !showKeyboard &&
        <LottieView
          source={require('../../assets/finance_dark.json')}
          autoPlay={true}
          resizeMode="cover"
          style={{width:'90%', marginTop:20}}
        /> 
      }
      
      <View style={{flexDirection:'row',marginTop:!showKeyboard?0:50}}>
        <Text style={[styles.txtLogo,{color:'#5E57B2'}]}>M</Text>
        <Text style={[styles.txtLogo,{color:'#E7E8EB'}]}>y</Text>
        <Text style={[styles.txtLogo,{color:'#F8BB84'}]}>M</Text>
        <Text style={[styles.txtLogo,{color:'#E7E8EB'}]}>oney</Text>
      </View>

      <Text style={styles.subTxt}>Gerencie sua vida financeira!</Text>
      <Text style={[styles.subTxt,{marginTop:70}]}>Como devo te chamar?</Text>
    

      <TextInput 
        style={styles.inputName}
        color='#E7E8EB'
        fontSize={20}
        onChangeText={setName}
        value={name}
      />

      <TouchableOpacity 
        style={styles.btn}
        onPress={()=>fComeca()}
      >
        <Text style={styles.txtBtn}>Começar</Text>
      </TouchableOpacity>

    </SafeAreaView>
    
  );
}