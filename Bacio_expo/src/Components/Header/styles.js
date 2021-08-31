import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    header: {
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    leftIcon:{
        position: 'absolute',
        left: 20,
        top: 30,
        resizeMode:'contain'
    },

    leftIconImage:{
        width:30,
        height:30
    },

    SearchImage:{
        width: 32,
        height: 37,
        resizeMode:'contain'
    },

    Search:{
        position:'absolute',
        right: 30,
        top:30
    },
});

export default styles;