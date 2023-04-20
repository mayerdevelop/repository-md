import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import {Animated} from 'react-native';

export const styleSheet = StyleSheet.create({
    shadow:{
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 3,
      }
})

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

export const ButtonAddFooter = styled.TouchableOpacity`
    bottom:20px;
    background-color:#fff;
    border-radius:100px;
    width:55px;
`

export const ScrollSections = styled.ScrollView`
    height:320px;
    margin-left:15px;
`

export const ItemService = styled.TouchableOpacity<{backgroundColor: string}>`
    height:90%;
    width:220px;
    border-radius:30px;
    padding:30px;
    margin-right:15px;
    align-items:center;
    justify-content:space-between;
    ${({ backgroundColor }) => `background-color:${backgroundColor}`};
`

export const NameService = styled.Text`
    font-size:24px;
    font-weight:600;
`

export const MainIndicatorSections = styled.View`
    flex-direction:row;
    align-items:center;
    margin-left:20px;
    margin-right:20px;
    margin-bottom:10px;
`

export const IndicatorSections = styled(Animated.View)<{backgroundColor: string}>`
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

export const IndicatorGraphics = styled(Animated.View)<{backgroundColor: string}>`
    ${({ backgroundColor }) => `background-color:${backgroundColor}`};
    height:8px;
    border-radius:4px;
    margin-left:4px;
    margin-right:4px;
    top:22px;
`

export const GraphicContainer = styled.View<{windowHeight: number}>`
    height:500px;
    ${({ windowHeight }) => `height:${windowHeight}px`};
`

export const GraphicSections = styled.View`
    width:100%;
    align-items:center;
`

export const TitleSection = styled.Text<{margin: number}>`
    font-size:22px;
    font-weight:600;
    ${({ margin }) => `margin:${margin}px`};
`

export const HeaderGraphics = styled.View`
    margin-left:20px;
    margin-right:20px;
`

export const SafeAreaPopups = styled.SafeAreaView`
    flex:1;
`

export const Popup = styled.View<{top: number}>`
    border-radius:20px;
    position:absolute;
    ${({ top }) => `top:${top}px`};
    right:60px;
    padding:15px;
    background-color:#fff;
`

export const PopupContainer = styled.TouchableOpacity<{border: boolean}>`
    flex-direction:row;
    align-items:center;
    border-bottom-width:${props => `${props.border ? 0 : 0.3}px`};
    border-color:grey;
`

export const TextPopup = styled.Text`
    font-weight:500;
    margin-left:10px;
    margin:15px;
`

export const SafeAreaModals = styled.SafeAreaView`
    flex:1;
    background-color:#00000080;
    justify-content:flex-end;
`

export const ModalContainer = styled.View`
    background-color:#fff;
    height:85%;
    border-top-right-radius:25px;
    border-top-left-radius:25px;`

export const ModalHeader = styled.View`
    margin:22px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

export const TextModalHeader = styled.Text`
    font-size:26px;
    color:#426AD0;
    font-weight:bold;
`

export const CloseModal = styled.TouchableOpacity`
    width:80px;
    align-items:flex-end;
`

export const MiddleModalContainer = styled.View`
    padding-left:22px;
    padding-right:22px;
`

export const MiddleModalText = styled.Text`
    font-size:16px;
    font-weight:600;
    color:grey;
`

export const ContainerItemsOrder = styled.View`
    flex:1;
    margin-top:20px;
    max-height:67%;
`

export const ContainerLineItemsOrder = styled.View<{backGround: boolean}>`
    padding-left:22px;
    padding-right:22px;
    padding-top:15px;
    padding-bottom:5px;
    background-color:${props => props.backGround ? 'rgba(66, 106, 208, 0.1)' : '#fff'};
`

export const ItemCodigoOrder = styled.Text`
    font-size:18px;
    color:#426AD0;
    font-weight:bold;
`

export const ItemDescOrder = styled.Text`
    font-size:16px;
    font-weight:600;
`

export const DropDownContainer = styled.TouchableOpacity<{backGround: boolean}>`
    justify-content:center;
    align-items:center;
    background-color:${props => props.backGround ? 'rgba(66, 106, 208, 0.1)' : '#fff'};
`

export const DropDownListContainer = styled.View`
    margin-top:10px;
    justify-content:space-between;
    align-items:center;
    flex-direction:row;
`

export const DropDownSection = styled.View`
    align-items:center;
`

export const DropDownHeaderSection = styled.Text`
    color:#426AD0;
    font-weight:600;
    font-size:16px;
`

export const DropDownItemSection = styled.Text`
    font-size:16px;
`

export const FooterModalComponent = styled.View`
    bottom:20px;
    position: absolute;
    background-color:#426AD0;
    width:75%;
    height:55px;
    border-radius:40px;
    justify-content:space-around;
    align-items:center;
    flex-direction:row;
`

export const ModalContentFooter = styled.View`
    align-items:center;
`

export const TextModalFooter = styled.Text`
    color:#fff;
    font-size:16px;
    font-weight:500;
`