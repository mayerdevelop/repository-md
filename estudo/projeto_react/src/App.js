import React from 'react'
import {SafeAreaView,StyleSheet} from 'react-native'

//import Primeiro from './components/Primeiro'
//import CompPadrao,{Comp1,Comp2} from './components/Multi'
//import MinMax from './components/MinMax'
//import Titulo from './components/Titulo'
//import Botao from './components/Botao'
//import Contador from './components/Contador'
//import Pai from './components/direta/Pai'
//import Pai from './components/indireta/Pai'
//import ContadorV2 from './components/contador/ContadorV2'
//import Diferenciar from './components/Diferenciar'
//import ParImpar from './components/ParImpar'
//import Familia from './components/relacao/Familia'
//import Membro from './components/relacao/Membro'
//import UsuarioLogado from './components/UsuarioLogado'
//import ListaProdutos from './components/produtos/ListaProdutos'
//import ListaProdutosV2 from './components/produtos/ListaProdutosV2'
//import DigiteSeuNome from './components/DigiteSeuNome'
//import FlexboxV1 from './components/layout/FlexboxV1'
//import FlexboxV2 from './components/layout/FlexboxV2'
//import FlexboxV4 from './components/layout/FlexboxV4'
import Mega from './components/mega/Mega'

export default () => (
    <SafeAreaView style={style.App}>

        <Mega qtdeNumeros={7}/>

        {/*
        <DigiteSeuNome/>
        <ListaProdutosV2 />
        <UsuarioLogado usuario={{nome:'Gui',email:'gui@email.com'}}/>
        <Familia>
            <Membro nome="Bia" sobrenome="Arruda"/>
            <Membro nome="Carlos" sobrenome="Arruda"/>
        </Familia>
        <Familia>
            <Membro nome="Julia" sobrenome="Silva"/>
            <Membro nome="Ana" sobrenome="Silva"/>
        </Familia>
        <ParImpar num={3}/>
        <Diferenciar />
        < ContadorV2 />
        <Primeiro/>        
        <Pai />
        <Contador inicial={100} passo={13}/>
        <Botao/>
        <Titulo principal='Cadastro' secundario='Tela de Cadastro do Produto'/>
        <CompPadrao/>
        <Comp1/>
        <Comp2/>
        <MinMax min={3} max={20}/>
        */}
    </SafeAreaView>
)

const style = StyleSheet.create({
    App:{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20

    }
})