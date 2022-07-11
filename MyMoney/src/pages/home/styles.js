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

  modalContainer:{
    flex:1,
    height:560,
    padding:20,
    backgroundColor:'#232229',
    borderTopStartRadius:10,
    borderTopEndRadius:10,
  },

  headerModal: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  },

  typeIcon:{
    backgroundColor:'#5E57B2',
    width:50,
    height:50,
    borderRadius:50/2,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:10
  },

  typeOff:{
    opacity:0.5
  },

  elipseCheck:{
    width:38,
    height:38,
    borderRadius:38/2,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#fff',
    marginTop:10,
  }

});

export default styles;