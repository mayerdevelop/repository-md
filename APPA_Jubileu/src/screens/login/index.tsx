import React,{useState,useEffect,useCallback} from 'react';
import {
    View,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


import { MotiView, AnimatePresence } from 'moti';
import LottieView from 'lottie-react-native';

import * as Style from './styles';

interface Props{
    navigation: any
}

export default function login({navigation}: Props){
    
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [load, setLoad] = useState(false)

    const [header, setHeader] = useState(false);

    const keyboardDidShow = useCallback(() => {
        setHeader(true);
      }, []);
      
      const keyboardDidHide = useCallback(() => {
        setHeader(false);
      }, []);
      
      useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);
      
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
          };
      }, [keyboardDidShow, keyboardDidHide]);

    const handleHome = () => {
        navigation.navigate('home')
    }

    return(<>
        <SafeAreaView 
            edges={["top"]}
            style={{ flex: 0, backgroundColor: "#426AD0" }}
        />
        <Style.SafeContainer onTouchStart={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <AnimatePresence exitBeforeEnter>
                    { !header &&
                        <MotiView
                            from={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                            exitTransition={{type: 'timing', duration: 300}}
                        >
                            <LottieView
                                autoPlay
                                loop
                                style={{width: 350, height:350}}
                                source={require('../../assets/login.json')}
                            />
                        </MotiView>
                    }
                </AnimatePresence>

                <Style.Container header={header}>
                    <Style.TextLogin>Login</Style.TextLogin>

                    <Style.InputArea>
                        <View>
                            <Style.LabelInput>USUÁRIO</Style.LabelInput>
                            <Style.InputField
                                autoCorrect={false}
                                onChangeText={setUser}
                                value={user}
                                style={Style.styleSheet.shadow}
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
                                style={Style.styleSheet.shadow}
                            >
                            </Style.InputField>
                        </View>

                        <Style.ButtonSubmit
                            onPress={() => handleHome()}
                            style={Style.styleSheet.shadow}
                            activeOpacity={0.8}
                        >
                            <Style.TextSubmit>Entrar</Style.TextSubmit>
                        </Style.ButtonSubmit>
                    </Style.InputArea>
                </Style.Container>
            </KeyboardAvoidingView>         
        </Style.SafeContainer>
    </>)
}