import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    footerContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#96250C',
        width:'94%',
        height:90,
        borderRadius:12,
        position:'absolute',
        bottom: 10,
        shadowColor:'#000',
        shadowOffset:{width:0,height:20},
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    },

    imageContent:{
        flex:1,
        alignItems:'center',
    },

    titleButtom:{
        fontSize:12,
        fontWeight:'bold',
        color:'#fff',
    },

})

export default styles;

