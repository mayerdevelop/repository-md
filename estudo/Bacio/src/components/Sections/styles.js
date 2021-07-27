import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    
    card: {
        width:'42%',
        padding:10,
        margin:10,
        height:130,
        borderColor:'#723600',
        borderWidth:2,
        borderRadius:20
    },

    icon: {
        resizeMode:'contain',

    },

    content:{
        flex: 1,
        justifyContent:'center',
        flexDirection: 'row',
        flexWrap:'wrap'
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

});

export default styles;