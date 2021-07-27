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

    content1:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        marginHorizontal:20,
        marginBottom:20,
    },

    card1: {
        width:'100%',
        paddingHorizontal:10,
        height:50,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
    },

    cardTitle1:{
        fontSize:25,
        fontWeight:'bold',
        color:'#723600',
        marginHorizontal:20
    },

    cardDesc1:{
        textAlignVertical:'center',
        fontWeight:'bold',
        fontSize:24,
        color:'#585450',
        top:5,
    },

    content2:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
    },

    subContent2:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        height:80,
        marginHorizontal:10,
    },

    card2: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginHorizontal:10,
        marginVertical:0,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
    },

    cardTitle2:{
        fontSize:25,
        fontWeight:'bold',
        color:'#723600',
        marginHorizontal:10
    },

    cardDesc2:{
        textAlignVertical:'center',
        fontWeight:'bold',
        fontSize:24,
        color:'#585450',
        
    },

    content3:{
        flex:1,
        flexDirection:'row',
        height:90,
        marginBottom:20,
    },

    card3: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginHorizontal:20,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
        padding:5
    },

    cardTitle3:{
        fontSize:25,
        fontWeight:'bold',
        color:'#723600',
        marginHorizontal:20
    },

    cardDesc3:{
        textAlignVertical:'center',
        fontWeight:'bold',
        fontSize:24,
        color:'#585450',
        
    },

});

export default styles;