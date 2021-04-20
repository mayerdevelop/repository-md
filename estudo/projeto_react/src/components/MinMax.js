import React from 'react'
import { Text } from 'react-native'
import Estilo from './estilo'

export default (props) => {
    return(
        <Text style={Estilo.txtG}>
            O Valor {props.max} é maior que o valor {props.min}
        </Text>
    )
}