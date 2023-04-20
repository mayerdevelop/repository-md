import React, {useState} from 'react';
import * as Style from './styles';
import { Modal, Text, View, FlatList, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { CurrencyFormat } from '../utils/currencyFormat';

interface Props{
    getVisible: boolean,
    handleModal: (item: any) => void,
    itemModal: any
}

export default function orderModal({getVisible, handleModal, itemModal} : Props){

    const [dropIndex, setDropIndex] = useState(null)

    const handleDropDown = (index: any) => {
        if(index === dropIndex){
            setDropIndex(null)
        }else {
            setDropIndex(index)
        }
    }

    const somarValores = (objetos: any) => {
        let somaQuantidade = 0;
        let somaValorTotal = 0;
      
        objetos.forEach((objeto: any) => {
          somaQuantidade += objeto.quantidade;
          somaValorTotal += objeto.valor_total;
        });
      
        return {
          somaQuantidade,
          somaValorTotal
        };
    }      

    const DATA = [
            {
                "codigo": "FOX290 C1",
                "descricao": "ARM TR90 H  TR90 M 56-18-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "854032"
            },
            {
                "codigo": "FOX328 C1",
                "descricao": "ARM METAL H  ACE M 55-17-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "854033"
            },
            {
                "codigo": "FOX328 C1",
                "descricao": "ARM METAL H  ACE M 55-17-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "3424"
            },
            {
                "codigo": "FOX328 C1",
                "descricao": "ARM METAL H  ACE M 55-17-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "545234"
            },
            {
                "codigo": "FOX328 C1",
                "descricao": "ARM METAL H  ACE M 55-17-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "57886"
            },
            {
                "codigo": "FOX328 C2",
                "descricao": "ARM METAL H  ACE M 55-17-140",
                "quantidade": 1,
                "quant_fatura": 1,
                "valor_unit": 116.10,
                "valor_total_fatura": 116.10,
                "valor_total": 116.10,
                "id": "854034"
            }
    ]

    return(
        <Modal 
            transparent
            visible={getVisible}
            animationType='slide'
        >
            <Style.SafeAreaModals>
                <Style.ModalContainer style={Style.styleSheet.shadow}>
                    <Style.ModalHeader>
                        <Style.TextModalHeader>
                            {itemModal && itemModal.codigo}
                        </Style.TextModalHeader>

                        <Style.CloseModal 
                            onPress={() => handleModal(null)}
                            activeOpacity={0.6}
                        >
                            <FontAwesome
                                name="close"
                                size={24}
                                color="#FF9F47"
                            />
                        </Style.CloseModal>
                    </Style.ModalHeader>

                    <Style.MiddleModalContainer>
                        <Style.MiddleModalText>
                            {itemModal && itemModal.cliente}
                        </Style.MiddleModalText>
                    </Style.MiddleModalContainer>

                    <Style.ContainerItemsOrder>
                        <FlatList
                            data={DATA}
                            renderItem={({item, index}) => (
                                <>
                                    <Style.ContainerLineItemsOrder 
                                        backGround={index % 2 == 0}
                                    >
                                        <Style.ItemCodigoOrder>
                                            {item.codigo}
                                        </Style.ItemCodigoOrder>

                                        <Style.ItemDescOrder>
                                            {item.descricao}
                                        </Style.ItemDescOrder>

                                        { index === dropIndex &&
                                            <Style.DropDownListContainer>
                                                <Style.DropDownSection>
                                                    <Style.DropDownHeaderSection>
                                                        Quant.
                                                    </Style.DropDownHeaderSection>
                                                    <Style.DropDownItemSection>
                                                        {item.quantidade}
                                                    </Style.DropDownItemSection>
                                                </Style.DropDownSection>

                                                <Style.DropDownSection>
                                                    <Style.DropDownHeaderSection>
                                                        Valor Unitátio
                                                    </Style.DropDownHeaderSection>
                                                    <Style.DropDownItemSection>
                                                        {CurrencyFormat(item.valor_unit)}
                                                    </Style.DropDownItemSection>
                                                </Style.DropDownSection>
                                                
                                                <Style.DropDownSection>
                                                    <Style.DropDownHeaderSection>
                                                        Valor Total
                                                    </Style.DropDownHeaderSection>
                                                    <Style.DropDownItemSection>
                                                        {CurrencyFormat(item.valor_total)}
                                                    </Style.DropDownItemSection>
                                                </Style.DropDownSection>
                                            </Style.DropDownListContainer>
                                        }


                                    </Style.ContainerLineItemsOrder>

                                    <Style.DropDownContainer
                                        onPress={() => handleDropDown(index)}
                                        backGround={index % 2 == 0}
                                        activeOpacity={0.6}
                                    >
                                        <FontAwesome
                                            name={index === dropIndex ? "angle-up" : "angle-down"}
                                            size={24}
                                            color="black"
                                        />
                        
                                    </Style.DropDownContainer>
                                </>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </Style.ContainerItemsOrder>
                </Style.ModalContainer>

                <Style.ModalContentFooter >
                    <Style.FooterModalComponent>
                        <Style.TextModalFooter>
                           {'Quant.: ' + somarValores(DATA).somaQuantidade.toString()}
                        </Style.TextModalFooter>
                        <Style.TextModalFooter>
                            {'Total: ' + CurrencyFormat(somarValores(DATA).somaValorTotal)}
                        </Style.TextModalFooter>
                    </Style.FooterModalComponent>
                </Style.ModalContentFooter>
            </Style.SafeAreaModals>
        </Modal>
    )
}