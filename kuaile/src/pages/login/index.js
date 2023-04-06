import React, {useState, useEffect} from "react";
import { SafeAreaView,View,Text,Image,TextInput,TouchableOpacity,Keyboard,TouchableWithoutFeedback,ActivityIndicator,StyleSheet,Dimensions } from "react-native";
import api from '../../services/api';
import Svg, { Path } from 'react-native-svg';

import img64 from '../../../assets/dragonmd'
import axios from 'axios';

export default function Login({navigation}){

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [header, setheader] = useState(false)
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    },[]);


    const keyboardDidShow = () => { setheader(true) }
    const keyboardDidHide = () => { setheader(false) }

    const loadUser = async() =>{
        Keyboard.dismiss()
        setLoad(true)
        
        try{
            const response = await api.get(`/login/auth/${user+'&'+pass}`);

            if(response.data.message === 'error'){
                alert('Usuário ou senha incorretos')
                
            }else{
                navigation.navigate('List')
            }
        }catch(error){
            console.log(error)
        }

        setLoad(false)
    };
  
    return(<>

        <SafeAreaView style={{flex:0, backgroundColor:'#c00c0c'}} />
        <SafeAreaView style={{
            flex:1,
            backgroundColor: '#F8FAFC',
            justifyContent:'flex-start',
        }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    
                    { !header ?
                    <View>
                        <View style={{backgroundColor: '#c00c0c',height: Dimensions.get('screen').height/3+50}}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginTop:20
                            }}>
                                <Image style={{
                                    width:Dimensions.get('screen').width/2,
                                    height:220,
                                    resizeMode:'contain',
                                }} 
                                source={require('../../../assets/kuaile.png')}/>

                                <Image style={{
                                    width:Dimensions.get('screen').width/2,
                                    height:Dimensions.get('screen').height/3+50,
                                    resizeMode:'contain',
                                    zIndex:100
                                }} 
                                source={require('../../../assets/dragon.png')}/>

                            </View>
                            
                            <Svg 
                                height={100}
                                width={Dimensions.get('screen').width}
                                viewBox="0 0 1440 320"
                                style={{bottom:50}}
                            >
                                <Path
                                fill="#c00c0c"
                                d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
                                />
                            </Svg>
                        </View>
                    </View>
                    :

                    <View style={{backgroundColor: '#c00c0c',height: 30}}>
                        <Svg 
                            height={100}
                            width={Dimensions.get('screen').width}
                            viewBox="0 0 1440 320"
                        >
                            <Path
                            fill="#c00c0c"
                            d='M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,197.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
                            />
                        </Svg>
                    </View>
                    }

                    <View style={{marginHorizontal:30,marginTop:30}}>
                        <Text style={{fontSize:30,fontWeight:'bold',color:'#c00c0c'}}>Login</Text>
                        <Text style={{fontSize:24,fontWeight:'500',color:'#c00c0c',bottom:20}}>_______</Text>
                    </View>

                    <View style={{
                        justifyContent:'center',
                        marginTop:10,
                        marginHorizontal:30
                    }}>
                        <Text style={{fontWeight:'bold'}}>USUÁRIO</Text>

                        <View style={{
                            backgroundColor:'#EFEFEF',
                            borderRadius:15,
                            paddingVertical:15,
                            paddingHorizontal:15,
                            marginTop:5,
                            marginBottom:15
                        }}>
                            <TextInput
                                autoCorrect={false}
                                onChangeText={setUser}
                                value={user}
                                autoCapitalize='none'
                            />
                        </View>

                        <Text style={{fontWeight:'bold'}}>SENHA</Text>

                        <View style={{
                            backgroundColor:'#EFEFEF',
                            borderRadius:15,
                            paddingVertical:15,
                            paddingHorizontal:15,
                            marginTop:5
                        }}>
                            <TextInput
                                autoCorrect={false}
                                onChangeText={setPass}
                                value={pass}
                                secureTextEntry={true}
                                autoCapitalize='none'
                            />
                        </View>

                        <TouchableOpacity
                            onPress={()=>{loadUser()}}
                            style={{
                                backgroundColor:'#c00c0c',
                                alignItems:'center',
                                opacity:0.85,
                                justifyContent:'center',
                                marginTop:30,
                                height:55,
                                marginHorizontal:'30%',
                                borderRadius:40,
                                shadowColor: "#000",
                                shadowOffset: {width: 0,height: 2},
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >   
                            {load
                                ? <ActivityIndicator color={'#ffffff'} size={35}/>
                                : <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Entrar</Text>
                            }
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{marginTop:7}}>
                            <Text style={{textAlign:'center',fontWeight:'500',color:'#c00c0c'}}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                            
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    </>)
}



const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    top: {},
    bottom: {
      position: 'absolute',
      width: Dimensions.get('screen').width,
      bottom: 0,
    },
    box: {
      backgroundColor: '#c00c0c',
      height: 80,
    },
    bottomWavy: {
      position: 'absolute',
      bottom: 20,
    }
  })