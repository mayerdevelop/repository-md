import React from 'react'
import {StyleSheet, View} from 'react-native'
import Quadrado from './Quadrado'

export default props => {
    return (
        <View style={style.FlexV3}>
            <Quadrado lado={20} cor='#900'/>
            <Quadrado lado={30} cor='#090'/>
            <Quadrado lado={40} cor='#009'/>
              
        </View>
    )
}

const style = StyleSheet.create({
    FlexV3:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:350,
        width:'100%',
        backgroundColor:'#000',
    }
})