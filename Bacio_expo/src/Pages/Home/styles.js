import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    safeArea:{
        flex:1,
        backgroundColor:'#723600'
    },

    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    
    header: {
        justifyContent:'center',
        width:'100%',
        height:100,
        backgroundColor:'#723600',
        borderBottomStartRadius:20,
        borderBottomEndRadius:20
    },

    notification:{
        position:'absolute',
        right: 30,
        top:30
    },

    notificationImage:{
        width: 32,
        height: 37,
        resizeMode:'contain'
    },

    circle:{
        width:20,
        height:20,
        backgroundColor:'red',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent:'center',
        position: 'absolute',
        left:15,
    },

    contTextHeader:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:20,
        marginRight:80
    },

    textHeader:{
        fontSize:26,
        color:'#ffffff',
    },    


    content:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap',
    },

    sectionTitle:{
        fontSize:25,
        marginBottom:0,
        margin:30,
        color:'#585450',
        fontWeight:'bold',
    },


    card: {
        width:'42%',
        padding:10,
        margin:10,
        height:130,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:20,
    },

    cardTitle:{
        fontWeight: 'bold',
        fontSize:24,
        color:'#723600', 
    },

    cardP: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginVertical:10,
        marginHorizontal:20,
        height:70,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:10,
    },

    cardTitleP:{
        fontWeight: 'bold',
        fontSize:24,
        color:'#585450',
    },

    titleContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end'
    },

});

export default styles;