import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:50,
    },

    containerLogo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
    },

    containerInput:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
    },

    input:{
        backgroundColor:'#fff',
        width:'90%',
        marginBottom:15,
        color:'#222',
        fontSize:17,
        borderWidth:2,
        borderRadius:7,
        padding:10,
        borderColor:'#723600'
    },

    containerInpuPass:{
        width:'90%',
        flexDirection:'row',
        backgroundColor:'#fff',
        marginBottom:15,        
        borderWidth:2,
        borderRadius:7,
        borderColor:'#723600',
        alignItems:'center',
    },
        
    inputPass:{
        color:'#222',
        fontSize:17,
        width:'90%',
        padding:10,
    },

    button:{
        backgroundColor:'#723600',
        width:'90%',
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,
    },

    buttonText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    },
    
});

export default styles;