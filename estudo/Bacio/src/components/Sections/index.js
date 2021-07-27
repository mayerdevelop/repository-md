import React from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';

import styles from './styles';

//icones
import typeIcons from '../../utils/typeIcons';

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