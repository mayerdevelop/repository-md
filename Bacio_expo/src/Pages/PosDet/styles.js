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
        fontWeight:'bold',
    },

    contScrow:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        marginTop:30,
        marginBottom:120,
        paddingHorizontal:20
    },

    content1: {
        flex:1,
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:5,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
        marginBottom:20,
    },
    
    cardTitle1:{
        fontSize:25,
        fontWeight:'bold',
        color:'#723600',
        marginBottom:2
    },

    cardDesc1:{
        textAlignVertical:'center',
        fontWeight:'bold',
        fontSize:24,
        color:'#585450',
    },

    content2:{
        flex:1,
        flexDirection:'row',
        marginBottom:20,
    },

    subContent2:{
        flex:1,
        flexDirection:'column',
        marginHorizontal:10,
    },

    card2: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:0,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
        paddingVertical:2
    },

    cardTitle2:{
        fontSize:25,
        fontWeight:'bold',
        color:'#723600',
    },

    cardDesc2:{
        textAlignVertical:'center',
        fontWeight:'bold',
        fontSize:24,
        color:'#585450',
        
    },



});

export default styles;