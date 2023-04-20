import styled from 'styled-components/native'
import { StyleSheet } from 'react-native';

export const styleSheet = StyleSheet.create({
    shadow:{
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 1,
      }
})

export const SafeContainer = styled.SafeAreaView`
    flex:1;
    align-items:center;
`

export const HeaderComponent = styled.View`
    background-color:#426AD0;
    height:16%;
    border-bottom-left-radius:50px;
    border-bottom-right-radius:50px;
    padding:25px;
    justify-content:flex-end;
    width:100%;
`

export const HeaderContainer = styled.View`
    justify-content:space-between;
    align-items:center;
    flex-direction:row;
`

export const SearchComponent = styled.View`
    background-color:#fff;
    border-radius:30px;
    width:85%;
    align-items:center;
    flex-direction:row;
    justify-content:space-between;
    padding-right:35px;
`

export const InputField = styled.TextInput`
    padding:10px;
    padding-left:20px;
    padding-right:20px;
    height:45px;
    width:100%;
    font-size:16px;
`

export const ButtonFilter = styled.TouchableOpacity`
`

export const ContainerList = styled.View`
    flex:1;
    width:90%;
    max-height:70%;
    margin-top:20px;
`

export const ContainerItemOrder = styled.TouchableOpacity`
    background-color:#fff;
    margin-bottom:10px;
    padding:15px;
    border-radius:30px;
`

export const HeaderItemOrder = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

export const CodigoOrder = styled.Text`
    color:#426AD0;
    font-weight:bold;
    font-size:16px;
`

export const DateOrderContainer = styled.View`
    flex-direction:row;
`

export const TextDateOrder = styled.Text<{color: string}>`
    font-size:12px;
    font-weight:500;
    ${({ color }) => `color:${color}`};
`

export const MiddleTextOrder = styled.View`
    width:100%;
    margin-top:12px;
`

export const TextClienteMiddle = styled.Text`
    font-size:14px;
    font-weight:bold;
`

export const TextStatusMiddle = styled.Text`
    font-size:12px;
    font-weight:500;
    color:#FF9F47;
`

export const DownTextOrder = styled.View`
    width:100%;
    margin-top:12px;
    flex-direction:row;
    justify-content:space-between;
`

export const DownOrderContainer = styled.View`
    flex-direction:row;
`

export const TextCgcOrder = styled.Text<{color: string}>`
    font-size:12px;
    font-weight:500;
    ${({ color }) => `color:${color}`};
    opacity:0.9;
`

export const TextOffLine = styled.Text`
    color:tomato;
    font-weight:600;
    margin-top:5px;
`