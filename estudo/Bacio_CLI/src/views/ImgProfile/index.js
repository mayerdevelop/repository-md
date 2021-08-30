import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

 import * as ImagePicker from "react-native-image-picker";
//import ImagePicker from 'react-native-image-picker';
//import Axios from 'axios';

export default function Upload() {

const [responseGallery, setResponseGallery] = useState(null);

  return (
      
    <View style={styles.container}>
      <Text style={styles.title}>Imagem de Perfil</Text>



<TouchableOpacity
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setResponseGallery(response);
            },
          )
        }>
        {responseGallery === null ? (
          <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/149/149071.png'}}
          style={styles.avatar}
          />
        ) : (
          <Image style={styles.avatar} source={{uri: responseGallery.uri}} />
    
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  title:{
      fontSize:30,
      bottom:40
  }
});
