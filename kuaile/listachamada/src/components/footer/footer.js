import React from "react";
import { 
    View,
    Text,
    TouchableOpacity
} 
from 'react-native'

import styles from './styles';
import { FontAwesome,FontAwesome5,Feather } from '@expo/vector-icons';


export default function Footer({current,setPageCurrent}){

    return(
        <View style={styles.container}> 
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.circleFooter} onPress={()=>{setPageCurrent('list')}}>
                    <FontAwesome5 name="list-ul" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.currentPage}>{current === 'list' ? '-' : ''}</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.circleFooter} onPress={()=>{setPageCurrent('students')}}>
                    <FontAwesome5 name="user" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.currentPage}>{current === 'students' ? '-' : ''}</Text>
            </View>
            
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.circleFooter} onPress={()=>{setPageCurrent('alllists')}}>
                    <FontAwesome name="list-alt" size={22} color="white" />
                </TouchableOpacity>
                <Text style={styles.currentPage}>{current === 'alllists' ? '-' : ''}</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.circleFooter} onPress={()=>{setPageCurrent('graphic')}}>
                    <Feather name="pie-chart" size={22} color="white" />
                </TouchableOpacity>
                <Text style={styles.currentPage}>{current === 'graphic' ? '-' : ''}</Text>
            </View>
        </View>
    )
}