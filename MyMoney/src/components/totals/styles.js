import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    card:{
        backgroundColor:'#232229',
        width:'100%',
        padding:20,
        borderRadius:10
    },

    secVlr:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginTop:2
    },

    subVlr:{
        fontSize:16,
        opacity:0.4,
        color:'#fff',
        fontWeight:'600'
    },

    cifrao:{
        opacity:0.4,
        color:'#fff',
        fontWeight:'bold',
        bottom:3
    },
    
    skeleton:{
        backgroundColor:'#d9d9d9',
        marginTop:10,
        borderRadius:5,
      }

});

export default styles;