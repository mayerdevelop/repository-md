import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    content:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap',
    },

    cardP: {
        width:'95%',
        padding:10,
        borderColor:'#2F8BD8',
        borderWidth:2,
        borderRadius:10,
        marginBottom:10,
    },
    

    cardTitleP:{
        fontWeight: 'bold',
        fontSize:20,
        color:'#000',
        marginBottom:8 
    },

    cardDescP:{
        fontWeight: 'bold',
        fontSize:16,
        color:'#585450',
        marginBottom:8 
    },

    cardSubTitleP:{
        fontSize:14,
        color:'#585450',
    },

    genero:{
        width:20,
        bottom:8,
        resizeMode:'contain'
    },

    imgPreview:{
        height: 250, 
        width: 250, 
        marginVertical: 10, 
        resizeMode:'contain'
    },

    txtPreview:{ 
        fontSize: 30, 
        textAlign: 'center'
    },

    closeModal: {
        height: 40,
        alignItems: 'flex-end',
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    emptyText: {
        fontSize: 22,
        color:'red'
    },

    headerPed: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15
    },

    contDetPed: {
        flex:1,
        borderBottomWidth:2,
        borderColor:'#2F8BD8',
        marginVertical:10
    },

    cabecDet:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10
    },

    itensDet:{
        marginTop:5,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10
    },

    totalPed:{
        height:70,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:2,
        borderRadius:10,
        paddingHorizontal:10,
        backgroundColor:'#C5DBE3'
    },

    txtBold:{
        fontSize:16, 
        fontWeight:'bold'
    },
      
});

export default styles;