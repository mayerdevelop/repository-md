import React,{useState,useEffect} from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import ImgLogin from '../../assets/header_login.svg' 
import Wave from '../../assets/wave.svg';

import * as Style from './styles';

export default function login({navigation}){
    
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

    return( 
        <>
        <SafeAreaView 
            edges={["top"]}
            style={{ flex: 0, backgroundColor: "#426AD0" }}
        />
        <Style.SafeContainer>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={{backgroundColor:'#426AD0', height:!header ? 220 : 35}}>
                    <Wave width={'100%'} style={{height:120, top:!header ? 200: 0}}/>
                    { !header &&
                        <Style.Imagem>
                            <ImgLogin width={200} />
                        </Style.Imagem>
                    }
                </View>

                <Style.Container>
                    <Style.TextLogin>Login</Style.TextLogin>

                    <Style.InputArea>
                        <View>
                            <Style.LabelInput>USUÁRIO</Style.LabelInput>
                            <Style.InputField
                                autoCorrect={false}
                                onChangeText={setUser}
                                value={user}
                            >
                            </Style.InputField>
                        </View>

                        <View style={{marginTop:20}}>
                            <Style.LabelInput>SENHA</Style.LabelInput>
                            <Style.InputField
                                autoCorrect={false}
                                onChangeText={setPass}
                                value={pass}
                                secureTextEntry={true}
                            >
                            </Style.InputField>
                        </View>

                        <Style.ButtonSubmit>
                            <Style.TextSubmit>Entrar</Style.TextSubmit>
                        </Style.ButtonSubmit>
                    </Style.InputArea>
                    
                    
                </Style.Container>
            </KeyboardAvoidingView>         
        </Style.SafeContainer>
        </>
    )
}

/**
 * 
 * 
 * { !header ?
                    <Svg
                        viewBox="0 0 140 100"
                        preserveAspectRatio='xMinYMin meet'
                        style={{maxHeight:360}}
                    >
                        <Style.Wave>
                            <ImgLogin width={280} />
                        </Style.Wave>

                        <Path
                            fill="#426AD0"
                            d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z'
                        />
                    </Svg>
                :

                    <Svg
                        viewBox="0 0 500 100"
                        preserveAspectRatio='xMinYMin meet'
                        style={{maxHeight:100, marginBottom:20}}
                    >
                        <Path
                            fill="#426AD0"
                            d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z'
                        />
                    </Svg>
                }
 */