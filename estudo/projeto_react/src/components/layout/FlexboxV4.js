import React from 'react'
import {StyleSheet, View} from 'react-native'

export default props => {
    return (
        <View style={style.FlexV4}>
            <View style={style.V0}/>
            <View style={style.V1}/>
            <View style={style.V2}/>
        </View>
    )
}

const style = StyleSheet.create({
    FlexV4:{
        flexGrow: 1,
        width:100,
        backgroundColor:'#000',
    },

    V0:{
        backgroundColor:'#009',
        height:0
    },
    
    V1:{
        backgroundColor:'#900',
        flexGrow: 1
    },

    V2:{
        backgroundColor:'#090',
        flexGrow: 1
    }
})