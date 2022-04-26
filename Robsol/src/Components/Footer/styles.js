import {StyleSheet,Platform} from 'react-native'

const styles = StyleSheet.create({

    footerContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#175A93',
        width:'94%',
        height:90,
        borderRadius:12,
        position:'absolute',
        bottom: Platform.OS === 'ios' ? 32 : 10,
        shadowColor:'#000',
        shadowOffset:{width:0,height:20},
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5,
    },

    imageContent:{
        flex:1,
        alignItems:'center',
    
    },

    imageConfirm:{
        flex:1,
        alignItems:'center',
        bottom:30,
    },
    
    titleButtom:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
        marginTop:3
    }

})

export default styles;

