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
    Image
} from 'react-native';
 
import typeIcons from '../../utils/typeIcons';
import {decode, encode} from 'base-64'
import api from '../../services/api'

import styles from './styles';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Login({navigation}){

    const [offSet] = useState(new Animated.ValueXY({x:0,y:90}))
    const [logo] = useState(new Animated.ValueXY({x:1,y:1}))
    const [opacity] = useState(new Animated.Value(0))
    
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [load, setLoad] = useState(false);

    const [hidepass, setHidepass] = useState(false)

    const loadUser = async() =>{
        setLoad(true)
        
        try{
          const response = await api.get(`/users/${user}|&|${pass}`,{
            withCredentials: true,
            headers: {'Authorization': 'Basic ZmVsaXBlLm1heWVyOjgyNTE0OTAz'} })
            navigation.navigate('Home',{
                dataUser: response.data
              })
            }
        catch(error){
            
            alert(error)
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
        
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.containerLogo}>
                <Animated.Image
                    source={require('../../assets/logo.png')}
                    style={[{transform: [
                        {scaleX: logo.x},
                        {scaleY: logo.y},
                        ], 
                    }]}
                />
            </View>

            <Animated.View style={
                [styles.containerInput,
                    {   
                        opacity:opacity,
                        transform:[{ translateY: offSet.y }]
                    }
                ]
                }>
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    autoCorrect={false}
                    onChangeText={setUser}
                    value={user}
                />

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
                        <Image 
                            style={{
                                resizeMode:'contain',
                                right:10,
                            }}
                            source={hidepass?typeIcons[16]:typeIcons[15]}
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.button} onPress={loadUser}>
                    {load ? 
                    <View style={{flex:1,justifyContent:'center'}}>
                        <ActivityIndicator color={'#fff'} size={35}/>
                    </View>
                        :
                    <Text style={styles.buttonText}>Entrar</Text>
                    }
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}