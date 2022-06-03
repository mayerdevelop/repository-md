import React,{useEffect, useState} from 'react';
import {Text,SafeAreaView,View,Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import styles from './styles';
import Footer from '../../Components/Footer';

import pelicano from '../../Assets/pelicano.png'


export default function Calendar({navigation}){

const items = ({
    '2022-06-04': [{name: 'Filantropia - Instituto Kuaile'}],
    '2022-06-11': [{name: 'Reuniao Ritualistica'}],
    '2022-06-18': [{name: 'Reuniao Ritualistica'}, {name: 'Eleição Proxima Gestão'}]
  });


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
                        selected={'2022-06-01'}
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
                        futureScrollRange={7}
                        rowHasChanged={(r1, r2) => {
                            return r1.name !== r2.name;
                          }}
                    />
                </View>

                <View style={{alignItems:'center'}}>
                    <Footer navigation={navigation} />
                </View>
        </SafeAreaView>
        </>
    )
}