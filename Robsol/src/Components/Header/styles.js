import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    header: {
        height:65,
        width:'90%',
        marginBottom:20
    },

    container:{
        flex:1,
        flexDirection:'row',
    },

    rightIcon:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'flex-end',
    },

    leftIcon:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-end',
    },



});

export default styles;