import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#171719',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal:20
  },
  
  inputName:{
    borderBottomWidth:1.5,
    borderColor:'#E7E8EB',
    width:'90%',
    marginTop:30,
    marginBottom:50,
  },

  txtBtn:{
    color:'#E7E8EB', 
    fontWeight:'600', 
    fontSize:22
  },

  btn:{
    backgroundColor:'#5E57B2',
    padding:10,
    width:'40%',
    alignItems:'center',
    borderRadius:10
  },

  txtLogo:{
    fontSize:38,
    fontWeight:'bold'
  },

  subTxt:{
    color:'#E7E8EB', 
    fontWeight:'600', 
    fontSize:20
  }


});

export default styles;