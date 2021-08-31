import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

import styles from './styles';


export default function Sections({id,name,onPress}){
    return (
        <View style={styles.content} >
        <TouchableOpacity style={styles.cardP} onPress={onPress}>
            <Text style={styles.cardTitleP}>{id}</Text>
            <Text style={styles.cardSubTitleP}>{name}</Text>
        </TouchableOpacity>
    </View>
    )
}