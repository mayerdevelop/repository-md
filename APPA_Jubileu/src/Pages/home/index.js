import React from "react";
import {SafeAreaView, View} from "react-native";

import * as Style from "./styles";

import Services from "../../components/services"
import Charts from "../../components/charts"
import Footer from "../../components/footer";

export default function home({ navigation }) {

    return (
        <>
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

            <Style.ProfileButton>
                <Style.TextProfileButton>FM</Style.TextProfileButton>
            </Style.ProfileButton>
            </Style.HeaderComponent>

            <Style.ScrollMainContainer>
                <Services />
                <Charts />
            </Style.ScrollMainContainer>

            <Footer />
        </Style.SafeContainer>
        </>
    );
}
