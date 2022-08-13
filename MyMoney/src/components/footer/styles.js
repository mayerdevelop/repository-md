import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    footerContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#24232A',
        width:'94%',
        height:70,
        bottom:15,
        position:'absolute',
        borderRadius:12,
        shadowColor:'#000',
        shadowOffset:{width:0,height:20},
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    },

    titleButtom:{
        fontSize:10,
        fontWeight:'bold',
        color:'#fff',
    },

    calendIco:{
        backgroundColor:'#fff',
        borderRadius:5,
        borderWidth:2,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:2
    },

    yearCalend:{
        backgroundColor:'#5E57B2',
        width:'100%',
        alignItems:'center'
    },

    txtYearCalend:{
        fontWeight:'bold',
        fontSize:10,
        color:'#fff'
    },

    txtMonthCalend:{
        color:'#5E57B2',
        fontWeight:'bold'
    },

    elipseAdd:{
        backgroundColor:'#fff',
        width:70,
        height:70,
        borderRadius:70/2,
        justifyContent:'center',
        alignItems:'center',
        bottom:30
    },

})

export default styles;

