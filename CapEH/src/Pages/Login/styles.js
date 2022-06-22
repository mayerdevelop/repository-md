import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:40
    },

    safeView:{
        flex: 1, 
        backgroundColor: "#fff",
        position: "relative",
        alignItems:'center'
    },

    containerInput:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },


    containerInpuID:{
        flexDirection:'row',
        backgroundColor:'#fff',
        marginBottom:15,        
        borderRadius:7,
        borderWidth:2,
        borderColor:'#96250C',
        alignItems:'center',
        shadowColor:'#000000',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.30,
        shadowRadius:3.5,
        elevation:5,
    },
    containerInpuPass:{
        width:'92%',
        flexDirection:'row',
        backgroundColor:'#fff',
        marginBottom:15,
        borderRadius:7,
        borderWidth:2,
        borderColor:'#96250C',
        alignItems:'center',
        shadowColor:'#000000',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.30,
        shadowRadius:3.5,
        elevation:5,
    },

    inputID:{
        color:'#222',
        fontSize:17,
        width:'90%',
        padding:10,
    },
        
    inputPass:{
        color:'#222',
        fontSize:17,
        width:'90%',
        padding:10,
    },

    button:{
        backgroundColor:'#FBBC04',
        width:'100%',
        paddingHorizontal:40,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        shadowColor:'#000000',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.30,
        shadowRadius:3.5,
        elevation:5,
        marginTop:10
    },

    buttonText:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold',
    },
    

});

export default styles;