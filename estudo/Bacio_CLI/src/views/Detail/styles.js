import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'flex-start',
    },

    TextTitle:{
        fontSize:32,
        color:'#723600',
        alignItems:'center',
        justifyContent:'center',
        top:75,
        fontWeight:'bold'
    },

    contPage:{
        flex:1,
        flexDirection:'row',
    },

    subContPage:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:15,
        marginBottom:30
    },

    textNPage:{
        top:5,
        fontSize:20,
    },

});

export default styles;