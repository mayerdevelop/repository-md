import React, {useRef} from 'react';
import * as Style from './styles';

import {Animated, useWindowDimensions} from "react-native";

import Pedidos from "../assets/pedidos.svg";
import Clientes from "../assets/clientes.svg";
import Produtos from "../assets/produtos.svg";

import { services } from '../utils/data';

export default function charts({navigation}){

    const SvgItens = {
        Pedidos: Pedidos,
        Clientes: Clientes,
        Produtos: Produtos,
    };
    
    const scrollXServices = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();

    return(
        <>
            <Style.TitleSection margin={20}>
                Serviços
            </Style.TitleSection>

            <Style.MainIndicatorServices>
                {services.map((services, servicesIndex) => {
                    const width = scrollXServices.interpolate({
                        inputRange: [
                            windowWidth * (servicesIndex - 1),
                            windowWidth * servicesIndex,
                            windowWidth * (servicesIndex + 1)
                        ],
                        outputRange: [15, 30, 15],
                        extrapolate: "clamp",
                    });

                    return (
                        <Style.IndicatorServices
                            style={{width}}
                            key={servicesIndex}
                            backgroundColor={services.color}
                        />
                    );
                })}
            </Style.MainIndicatorServices>

            <Style.ScrollServices
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollXServices } } }],{ useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                {services.map((service, index) => {
                    const BackSvg = SvgItens[service.title];

                    return (
                        <Style.ItemService
                            key={index}
                            backgroundColor={service.backgroundColor}
                        >
                            {BackSvg && (
                                <BackSvg style={{ maxHeight: 200, bottom: 10 }} width={300} />
                            )}
                            <Style.NameService>{service.title}</Style.NameService>
                        </Style.ItemService>
                    );
                })}
            </Style.ScrollServices>
        </>
    )
}