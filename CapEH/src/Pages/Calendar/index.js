import React,{useEffect, useState} from 'react';
import {Text,SafeAreaView,View,Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import styles from './styles';
import Footer from '../../Components/Footer';
import api from '../../Services/api';

import pelicano from '../../Assets/pelicano.png'


export default function Calendar({navigation}){

  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    (async function(){
      try{
        const response = await api.get('/calendar/all');
        setCalendar(response.data)

      }catch(error){
        alert(JSON.stringify(error))
      }
    })();
  }, []);

  
  const items = calendar.reduce(
    (obj, item) => Object.assign(obj, { [item.data]: [{name:item.name}] }), {});
  
  const data = new Date()
  
  let dia = data.getDate().toString().padStart(2, '0')
  let mes = (data.getMonth()+1).toString().padStart(2, '0')
  let ano = data.getFullYear().toString()
  
  const dataSelected = ano+'-'+mes+'-'+dia

  const renderItem = (item) => {
    return (
        <Card style={{marginRight: 10, marginTop: 30}}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
    );
  };

    return(
        <>
        <SafeAreaView edges={["top"]} style={{ flex:0, backgroundColor: "#96250C" }}/>
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{flex: 1, backgroundColor: "#fff",position: "relative",}}
        >
                <View style={{flex:1,marginBottom:50}}>
                    <Agenda
                        items={items}
                        selected={dataSelected}
                        renderItem={renderItem}
                        minDate={'2022-06-01'}
                        maxDate={'2022-12-31'}
                        renderEmptyData={() => {
                            return <View style={{flex:1,alignItems:'center',marginTop:40}}>
                                <Text style={{fontWeight:'bold',fontSize:18,marginBottom:20}}>Não há compromissos para esse dia, caro Pelicaninho.</Text>
                                <Image style={{width:300,height:300,resizeMode:'contain'}} source={pelicano}/>
                            </View>;
                        }}
                        pastScrollRange={0}
                        futureScrollRange={6}
                        rowHasChanged={(r1, r2) => { return r1.name !== r2.name; }}
                    />
                </View>

                <View style={{alignItems:'center'}}>
                    <Footer navigation={navigation} />
                </View>
        </SafeAreaView>
        </>
    )
}