import React,{useState,useEffect} from 'react';
import {
    KeyboardAvoidingView, 
    View, 
    Keyboard, 
    TextInput, 
    Text, 
    TouchableOpacity,
    Animated,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';

import styles from './styles';

import api from '../../Services/api';

import { Ionicons } from '@expo/vector-icons';

export default function Login({route,navigation}){


    const [offSet] = useState(new Animated.ValueXY({x:0,y:90}))
    const [logo] = useState(new Animated.ValueXY({x:1,y:1}))
    const [opacity] = useState(new Animated.Value(0))
    
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [load, setLoad] = useState(false);

    const [hidepass, setHidepass] = useState(false)

    const loadUser = async() =>{
        Keyboard.dismiss()
        setLoad(true)
        
        try{
            const response = await api.get(`/login/auth/${user+'&'+pass}`);

            if(response.data.length === 0){
                alert('Usuário ou senha incorretos')
                
            }else{
                navigation.navigate('Home',{refreshCalend:true})
            }
        }catch(error){
            console.log(error)
        }

        setLoad(false)
    };



    useEffect(()=>{
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offSet.y,{
                toValue: 0,
                speed: 4,
                bounciness:20,
                useNativeDriver: true
            }),
            
            Animated.timing(opacity,{
                toValue: 1,
                duration:200,
                useNativeDriver: true
            })
        ]).start();
    },[]);

    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(logo.x,{
                toValue:0.7,
                duration:100,
                useNativeDriver: true
            }),
            Animated.timing(logo.y,{
                toValue:0.7,
                duration:100,
                useNativeDriver: true
            }),
        ]).start();
    };

    function keyboardDidHide(){
        Animated.parallel([
            Animated.timing(logo.x,{
                toValue:1,
                duration:100,
                useNativeDriver: true
            }),
            Animated.timing(logo.y,{
                toValue:1,
                duration:100,
                useNativeDriver: true
            }),
        ]).start();
    };
   
    return(
        <SafeAreaView style={styles.safeView} >
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Animated.Image
                    source={require('../../Assets/pelicano.png')}
                    style={[{transform: [{scaleX: logo.x}, {scaleY: logo.y} ]}]}
                />

                <View style={{marginTop:20,alignItems:'center'}}>
                    <Text style={{fontSize:26}}>Bem vindo Pelicaninho!</Text>
                    <Text style={{fontSize:16}}>Entre com a sua conta fornecida pelo capítulo</Text>
                </View>
                
                <Animated.View style={[styles.containerInput,{opacity:opacity,transform:[{ translateY: offSet.y }]}]}>
                    
                    <View style={styles.containerInpuID}>
                        <TextInput
                            style={styles.inputID}
                            placeholder="ID"
                            autoCorrect={false}
                            onChangeText={setUser}
                            value={user}
                        />
                    </View>

                    <View style={styles.containerInpuPass}>   
                        <TextInput
                            style={styles.inputPass}
                            placeholder="Senha"
                            autoCorrect={false}
                            onChangeText={setPass}
                            value={pass}
                            secureTextEntry={!hidepass}
                        />
                        <TouchableOpacity onPress={()=>{setHidepass(!hidepass)}}>
                            <Ionicons style={{right:10}} name={hidepass?"eye-off":"eye"} size={30} color="#96250C" />
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={loadUser}>
                        {load ?
                        <View style={{flex:1,justifyContent:'center'}}>
                            <ActivityIndicator color={'#000'} size={35}/>
                        </View>
                            :
                        <Text style={styles.buttonText}>Entrar</Text>
                        }
                    </TouchableOpacity>
                    
                    <View style={{marginTop:40}}>
                        <Text style={{color:'white'}}>v120220615</Text>
                    </View>


                </Animated.View>           
  
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}