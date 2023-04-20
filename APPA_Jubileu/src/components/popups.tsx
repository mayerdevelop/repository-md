import React from 'react';
import * as Style from './styles';
import { Modal, Platform } from 'react-native';
import { popup, filterOrder } from '../utils/data';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props{
    getVisible: boolean,
    handlePopup: (index: any) => void,
    type: string,
    filter: any
}

export default function popups({getVisible, handlePopup, type, filter} : Props){

    const navigation = useNavigation() //nao remover, esta macroexecutando com eval

    return(
        <Modal 
            transparent
            visible={getVisible} 
            animationType='fade'
        >
            <Style.SafeAreaPopups onTouchEnd={()=> handlePopup(null)}>
                <Style.Popup 
                    style={Style.styleSheet.shadow}
                    top={Platform.OS === 'ios' ? 125 : 55}
                >
                    { type === 'settings' &&
                        popup.map((item: any, index: number) =>{
                            return(
                                <Style.PopupContainer
                                    key={index}
                                    border={(popup.length - 1) === index}
                                    onPress={() => eval(`(${item.action})`)}
                                    activeOpacity={0.6}
                                >
                                    <AntDesign
                                        name={item.icon}
                                        color={item.color}
                                        size={24}
                                    />

                                    <Style.TextPopup>{item.title}</Style.TextPopup>
                                </Style.PopupContainer>
                            )
                        })
                    }

                    { type === 'filter' &&
                        filterOrder.map((item: any, index: number) =>{
                            if(!!item){
                                return(
                                    <Style.PopupContainer
                                        key={index}
                                        border={(popup.length) === index}
                                        onPress={()=> handlePopup(index)}
                                    >   
                                        <Ionicons
                                            name={filter === index ? "radio-button-on" : "radio-button-off"}
                                            size={20}
                                            color="#426AD0"
                                        />
                                        <Style.TextPopup>{item}</Style.TextPopup>
                                    </Style.PopupContainer>
                                )
                            }
                        })
                    }
                </Style.Popup>
            </Style.SafeAreaPopups>
        </Modal>
    )
}