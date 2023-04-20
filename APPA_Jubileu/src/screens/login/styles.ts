import styled from 'styled-components/native'
import { StyleSheet } from 'react-native';

export const styleSheet = StyleSheet.create({
    shadow:{
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 3,
      }
})
export const SafeContainer = styled.SafeAreaView`
    flex:1;
    background-color:#fff;
`

export const Imagem = styled.View`
    align-items:center;
    left:5px;
    bottom:150px;
`

export const Container = styled.View<{header: boolean}>`
    margin-left:25px;
    margin-right:25px;
    margin-top: ${props => `${props.header ? 60 : 0}px`};
`

export const TextLogin = styled.Text`
    color:#426AD0;
    font-weight:bold;
    font-size:24px;
    text-decoration:underline #426AD0;
`

export const InputArea = styled.View`
    margin-top:25px;
`

export const LabelInput = styled.Text`
    font-weight:600;
    font-size:12px;
`

export const InputField = styled.TextInput`
    margin-top:5px;
    background-color:#f2f2f2;
    border-radius:15px;
    padding:15px;
    height:50px;
`

export const ButtonSubmit = styled.TouchableOpacity`
    background-color:#426AD0;
    margin-left:90px;
    margin-right:90px;
    border-radius:20px;
    padding:10px;
    align-items:center;
    justify-content:center;
    height:45px;
    margin-top:30px;
`

export const TextSubmit = styled.Text`
    color:#fff;
    font-weight:500;
    font-size:20px;
`

export const AnimationContainer = styled.View`
    align-items:center;
    justify-content:center;
`