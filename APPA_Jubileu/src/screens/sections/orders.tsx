import React, { useState, useEffect } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import * as Style from './styles';

import Footer from '../../components/footer';
import OrderModal from "../../components/orderModal";
import Popups from '../../components/popups';

import { SToD } from '../../utils/dateFormat';
import { CgcFormat } from '../../utils/cgcFormat';

import { connection } from '../../services/monitor';

export default function orders(){

    const [visibleModal, setVisibleModal] = useState(false)
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [itemModal, setItemModal] = useState(null)
    const [filter, setFilter] = useState(1)
    const [disableFooter, setDisableFooter] = useState(false)

    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    },[]);

    const keyboardDidShow = () => { setDisableFooter(true) }
    const keyboardDidHide = () => { setDisableFooter(false) }

    const handleModal = (item: any) =>{
        setVisibleModal(!visibleModal)
        setItemModal(!!item && item)
    }

    const handlePopup = (index: any) =>{
        setVisiblePopup(!visiblePopup)
        
        if(!!index){
            setFilter(index)
        }
        
    }

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          codigo: '0103050041',
          status: 'Faturado em 22/02/23',
          cliente: 'OTICAS AGUIA FILMES LTDA',
          cnpj: '00544794000154',
          dtemisped: '20230130',
          nota: '000009373',
          serie: '1'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          codigo: '0103050042',
          status: 'Faturado em 22/02/23',
          cliente: 'OTICA CIENTIFICA',
          cnpj: '00544794000154',
          dtemisped: '20230130',
          nota: 'XXXXXXXXX',
          serie: ''
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          codigo: '0103050043',
          status: 'Faturado em 22/02/23',
          cliente: 'OTICA CIENTIFICA',
          cnpj: '00544794000154',
          dtemisped: '20230130',
          nota:'',
          serie:''
        },
    ];

    return(<>
        <SafeAreaView 
            edges={["top"]}
            style={{ flex: 0, backgroundColor: "#426AD0" }}
        />
        <Style.SafeContainer>
            <Style.HeaderComponent>
                <Style.HeaderContainer>
                    <Style.SearchComponent>
                        <Style.InputField
                            autoCorrect={false}
                            placeholder='Pesquisar'
                        />
                        <AntDesign name="search1" size={20} color="#A0A0A0" />
                    </Style.SearchComponent>
                    
                    <Style.ButtonFilter 
                        onPress={() => handlePopup(null)}
                        activeOpacity={0.6}
                    >
                        <AntDesign name="filter" size={30} color="white" />
                    </Style.ButtonFilter>
                </Style.HeaderContainer>
            </Style.HeaderComponent>
            
            { connection === 'offline' &&
                <Style.TextOffLine>
                    offline
                </Style.TextOffLine>
            }

            <Style.ContainerList>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <Style.ContainerItemOrder 
                            style={Style.styleSheet.shadow}
                            onPress={() => handleModal(item)}
                            activeOpacity={0.6}
                        >
                            <Style.HeaderItemOrder>
                                <Style.CodigoOrder>{item.codigo}</Style.CodigoOrder>
                                <Style.DateOrderContainer>
                                    <Style.TextDateOrder color={'#426AD0'}>
                                        {'Emissão: '}
                                    </Style.TextDateOrder>

                                    <Style.TextDateOrder color={'#000'}>
                                        {SToD(item.dtemisped)}
                                    </Style.TextDateOrder>
                                </Style.DateOrderContainer>
                            </Style.HeaderItemOrder>
                            
                            <Style.MiddleTextOrder>
                                <Style.TextClienteMiddle>
                                    {item.cliente}
                                </Style.TextClienteMiddle>
                                
                                <Style.TextStatusMiddle>
                                    {item.status}
                                </Style.TextStatusMiddle>
                            </Style.MiddleTextOrder>

                            <Style.DownTextOrder>
                                <Style.DownOrderContainer>
                                    <Style.TextCgcOrder color={'#426AD0'}>
                                        {'CNPJ: '}
                                    </Style.TextCgcOrder>

                                    <Style.TextCgcOrder color={'#000'}>
                                        {CgcFormat(item.cnpj)}
                                    </Style.TextCgcOrder>
                                </Style.DownOrderContainer>

                                <Style.DownOrderContainer>
                                    { !!item.nota && <>
                                        <Style.TextCgcOrder color={'#426AD0'}>
                                            {'Nota: '}
                                        </Style.TextCgcOrder>

                                        <Style.TextCgcOrder color={'#000'}>
                                            {item.nota + (item.serie && '-' + item.serie)}
                                        </Style.TextCgcOrder>
                                    </> }
                                </Style.DownOrderContainer>
                            </Style.DownTextOrder>
                        </Style.ContainerItemOrder>
                    )}
                />
            </Style.ContainerList>
            
            { !disableFooter && <Footer buttomAdd={true} /> }
        </Style.SafeContainer>

        <OrderModal 
            getVisible={visibleModal}
            handleModal={handleModal}
            itemModal={itemModal}
        />

        <Popups 
            getVisible={visiblePopup}
            handlePopup={handlePopup}
            type={'filter'}
            filter={filter}
        />
    </>)
}