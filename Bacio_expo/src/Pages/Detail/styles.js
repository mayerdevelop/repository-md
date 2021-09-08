import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    contSafe:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    container:{
        flex:1,
        alignItems:'center',
        marginBottom:120,
        width:'100%',
    },

    contScrow:{
        flex:1,
        top:15
    },

    TextTitle:{
        fontSize:32,
        color:'#723600',
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

    input: {
        flex: 1,
        height: 50,
        margin: 30,
        fontSize: 21,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#723600',
        borderColor:'#723600',
        borderBottomWidth:2,
      },

      containerInput:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
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


});

export default styles;