import React from 'react'
import { Text } from 'react-native'
import Estilo from './estilo'

export default function(){
    return <Text style={Estilo.txtG}>Comp 0</Text>
}

export function Comp1(){
    return <Text style={Estilo.txtG}>Comp 1</Text>
}

export function Comp2(){
    return <Text style={Estilo.txtG}>Comp 2</Text>
}