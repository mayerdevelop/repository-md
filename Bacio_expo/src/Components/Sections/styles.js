import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    

    //Section Produto

    content:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap',
    },

    cardP: {
        width:'90%',
        paddingHorizontal:10,
        margin:10,
        height:80,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
    },
    

    cardTitleP:{
        fontWeight: 'bold',
        fontSize:20,
        color:'#585450', 
    },

    cardSubTitleP:{
        fontSize:18,
        color:'#585450', 
    },


    //Section Loja

    cardL: {
        marginVertical:12,
        marginHorizontal:20,
        height:120,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
        width:'90%',
        shadowColor:'#000',
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.20,
        shadowRadius:5.5,
        elevation:5,
    },

    cardLCabec: {
        flex:1,
        flexDirection:'row',
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
    },

    cardTitleL:{
        flex:1,
        fontSize:20,
        color:'#585450',
        marginHorizontal:10,
        borderColor:'#723600',
        borderBottomWidth:1.7,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
    },

    cardLItens:{
        flex:1,
        flexDirection:'row',
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
    },

    cardLItensLeft:{
        flex:1,
        flexDirection:'row',
        marginHorizontal:10,
        alignItems:'center'
    },

    cardLItensRight:{
        flex:1,
        flexDirection:'row',
        marginHorizontal:10,
        alignItems:'center',
        justifyContent:'flex-end'
    },

    cardLText:{
        fontSize:20,
        color:'#585450',
    },

});

export default styles;