import styled from 'styled-components'
import {Animated} from 'react-native'

export const SafeContainer = styled.SafeAreaView`
    flex:1;
    background-color:#fff;
    align-items:center;
`

export const HeaderComponent = styled.View`
    background-color:#426AD0;
    min-height:120px;
    border-bottom-left-radius:50px;
    border-bottom-right-radius:50px;
    padding:20px;
    justify-content:space-between;
    align-items:center;
    flex-direction:row;
    width:100%;
`

export const TextName = styled.Text`
    color:#fff;
    ${({ size }) => `font-size:${size}px`};
    font-weight: ${props => props.size === 24 ? 500 : 200};
`

export const ProfileButton = styled.TouchableOpacity`
    border-radius:100px;
    height:50px;
    width:50px;
    background-color:#fff;
    justify-content:center;
    align-items:center;
`

export const TextProfileButton = styled.Text`
    font-weight:bold;
    font-size:16px;
`

export const FooterComponent = styled.View`
    bottom:40px;
    position: absolute;
    background-color:#426AD0;
    width:80%;
    height:45px;
    border-radius:20px;
    justify-content:space-around;
    align-items:center;
    flex-direction:row;
`

export const ScrollMainContainer = styled.ScrollView`
    max-height:70%;
`