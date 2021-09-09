import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    contSafe:{
        flex:1,
        backgroundColor:'#723600'
    },

    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    contHeader: {
        alignItems:'center',
        width:'100%',
        height:250,
        backgroundColor:'#723600',
        borderBottomStartRadius:20,
        borderBottomEndRadius:20
    },

    header:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        marginVertical:25,
        marginBottom:40
    },

    buttonExit:{
        flexDirection:'row',
        backgroundColor:'#723600',
        borderRadius:20,
        padding:10,
        paddingVertical:12,
        shadowColor:'#000000',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.25,
        shadowRadius:4.5,
        elevation:5,
    },

    textExit:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
        marginHorizontal:15
    },

    nameUser:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff'
    },

    imageUser:{
        width:'45%',
        resizeMode:'contain',
    },

    contScrow:{
        flex:1,
        width:'90%',
        marginTop:90,
        marginBottom:120,
    },

    contItens:{
        flex:1,
        flexDirection:'row',
        margin:10,
        alignItems:'center', 
    },

    textInfo:{
        marginHorizontal:15,
        fontSize:18,
        fontWeight:'bold',
        color:'#585450',
    },

})

export default styles;