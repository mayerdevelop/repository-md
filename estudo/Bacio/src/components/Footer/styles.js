import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:'row',
        width:'100%',
        height:70,
        backgroundColor: '#723600',
        position: 'absolute',
        bottom: 0,
        alignItems:'center',
        justifyContent:'space-between',

    },


    navFooter:{
        width:55,
        height:55,
        resizeMode:'contain',
        marginHorizontal:40
    },

    buttom:{
        position:'relative',
        top: -30
    },

});

export default styles;