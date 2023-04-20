import React, { useState } from "react";
import {View} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import * as Style from "./styles";

import Sections from "../../components/sections"
import Charts from "../../components/charts"
import Footer from "../../components/footer";
import Popups from "../../components/popups";

import { connection } from "../../services/monitor";

export default function home() {

    const [visiblePopup, setVisiblePopup] = useState(false)

    const handlePopup = () =>{
        setVisiblePopup(!visiblePopup)
    }

    return (<>
        <SafeAreaView
            edges={["top"]}
            style={{ flex: 0, backgroundColor: "#426AD0" }}
        />
        <Style.SafeContainer>
            <Style.HeaderComponent>
                <View>
                    <Style.TextName size={18}>Olá,</Style.TextName>
                    <Style.TextName size={24}>Felipe Mayer</Style.TextName>
                </View>

                <Style.ProfileButton
                    onPress={handlePopup}
                    activeOpacity={0.6}
                >
                    <Style.TextProfileButton>FM</Style.TextProfileButton>
                </Style.ProfileButton>
            </Style.HeaderComponent>

            { connection === 'offline' &&
                <Style.TextOffLine>
                    offline
                </Style.TextOffLine>
            }

            <Style.ScrollMainContainer>
                <Sections />
                <Charts />
            </Style.ScrollMainContainer>

            <Footer buttomAdd={null} />
        </Style.SafeContainer>

        <Popups 
            getVisible={visiblePopup}
            handlePopup={handlePopup}
            type={'settings'} 
            filter={null}
        />
    </>);
}
