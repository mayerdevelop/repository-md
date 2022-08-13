import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#171719',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  name:{
    fontSize:24,
    color:'#fff',
    fontWeight:'600',
    textTransform: 'capitalize'
  },

  headerModal: {
    width:'100%',
    height:130,
    paddingHorizontal:20
  },

  typeIcon:{
    backgroundColor:'#5E57B2',
    width:50,
    height:50,
    borderRadius:50/2,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:12
  },

  typeOff:{
    opacity:0.5
  },


});

export default styles;