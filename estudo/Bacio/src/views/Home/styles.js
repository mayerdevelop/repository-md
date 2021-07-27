import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', //centraliza na horizontal
        justifyContent: 'flex-start' //centraliza na vertical
    },
    
    header: {
        alignItems: 'center',
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

    notificationText:{
        fontWeight:'bold',
        color: '#723600',
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

    textHeader:{
        fontSize:26,
        color:'#ffffff',
        flex: 1,
        top:30,
        justifyContent:'flex-start',
        right:120,
        fontFamily:'Segoe UI'
    },

    filter:{
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-around',
        height:50,
        alignItems:'center'
    },
    

    logo:{
        width: '80%',
        resizeMode:'contain'
    },

    content:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap'
    },

    sectionTitle:{
        flexDirection: 'row',
        fontSize:25,
        marginBottom:0,
        margin:30,
        color:'#585450',
        fontFamily:'Segoe UI',
        fontWeight:'bold'
    },

    titleContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'flex-end'
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
        width:'90%',
        paddingHorizontal:10,
        margin:10,
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

    titleContentP:{
        left:50,
        bottom:20
    },

});

export default styles;