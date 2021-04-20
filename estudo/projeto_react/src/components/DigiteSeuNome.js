import React,{useState} from 'react'
import {Text,View,TextInput} from 'react-native'
import Estilo from './estilo'

export default props => {
    const [nome, setNome] = useState('')
    return (
        <View>
            <Text>{nome}</Text>
            <TextInput
              placeholder='Digite seu nome'
              value={nome}
              onChangeText={nome => setNome(nome)}
            />
        </View>
    )
}