import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    footerContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#723600',
        width:'94%',
        height:90,
        borderRadius:12,
        position:'absolute',
        bottom:20,
        shadowColor:'#7F5DF0',
        shadowOffset:{width:0,height:10},
        shadowOpacity:0.30,
        shadowRadius:3.5,
        elevation:5,
    },

    imageContent:{
        flex:1,
        alignItems:'center'
    },

    imageConfirm:{
        flex:1,
        alignItems:'center',
        bottom:30
    },
    
    titleButtom:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
        marginTop:5
    }

})

export default styles;

