import styled from 'styled-components'
import {Animated} from 'react-native'

export const FooterComponent = styled.View`
    bottom:40px;
    position: absolute;
    background-color:#426AD0;
    width:75%;
    height:55px;
    border-radius:40px;
    justify-content:space-around;
    align-items:center;
    flex-direction:row;
`

export const ButtonFooter = styled.TouchableOpacity`
    width:50px;
    height:55px;
    justify-content:center;
    align-items:center;
`

export const TextOffline = styled.Text`
    color:tomato;
    bottom:100px;
    position:absolute;
    font-weight:500;
`

export const ScrollServices = styled.ScrollView`
    height:320px;
    margin-left:15px;
`

export const ItemService = styled.TouchableOpacity`
    height:90%;
    width:220px;
    border-radius:30px;
    padding:30px;
    margin-right:15px;
    align-items:center;
    justify-content:space-between;
    ${({ backgroundColor }) => `background-color:${backgroundColor}`};
    box-shadow: 2px 2px 5px lightgrey;
`

export const NameService = styled.Text`
    font-size:24px;
    font-weight:600;
`

export const MainIndicatorServices = styled.View`
    flex-direction:row;
    align-items:center;
    margin-left:20px;
    margin-right:20px;
    margin-bottom:10px;
`

export const IndicatorServices = styled(Animated.View)`
    ${({ backgroundColor }) => `background-color:${backgroundColor}`};
    height:8px;
    border-radius:4px;
    margin-left:4px;
    margin-right:4px;
`

export const MainIndicatorGraphics = styled.View`
    flex-direction:row;
    align-items:center;
`

export const IndicatorGraphics = styled(Animated.View)`
    ${({ backgroundColor }) => `background-color:${backgroundColor}`};
    height:8px;
    border-radius:4px;
    margin-left:4px;
    margin-right:4px;
    top:22px;
`

export const GraphicContainer = styled.View`
    height:500px;
    ${({ windowHeight }) => `height:${windowHeight}px`};
`

export const GraphicSections = styled.View`
    box-shadow: 2px 2px 5px lightgrey;
    width:100%;
    align-items:center;
`

export const TitleSection = styled.Text`
    font-size:22px;
    font-weight:600;
    ${({ margin }) => `margin:${margin}px`};
`

export const HeaderGraphics = styled.View`
    margin-left:20px;
    margin-right:20px;
`