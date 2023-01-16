import {StyleSheet,Platform} from 'react-native';

const styles = StyleSheet.create({

    container:{
        alignItems:'flex-end',
        justifyContent:'space-around',
        backgroundColor:'#c00c0c',
        width:'80%',
        height:60,
        borderRadius:40,
        flexDirection:'row',
        shadowColor: "#000",
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom:Platform.OS === 'android' ? 30 : 0
    },

    circleFooter:{
        borderRadius:100,
        width:38,
        height:38,
        backgroundColor:'#ffffff20',
        alignItems:'center',
        justifyContent:'center',
        top:5
    },

    currentPage:{
        color:'white',
        fontWeight:'bold',
        top:3
    }

});

export default styles;