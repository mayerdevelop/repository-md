import React,{useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

import { RadioButton } from 'react-native-paper';

import _ from 'underscore';

import styles from './styles';

import {decode, encode} from 'base-64';
import typeIcons from '../../utils/typeIcons'
import api from '../../services/api'

import ModFilter from '../../Modal/modFilter'

import Section from '../../Components/Sections';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function SaleCli({route,navigation}){

    const { nameSec,data,dataUser,filter,dataBack } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);
    const [list, setList] = useState(data);
    const [page, setPage] = useState(2);
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [checked, setChecked] = useState(filter);
    const [load, setLoad] = useState(false);

    const authBasic = 'YWRtaW46QVZTSTIwMjI';


    function buttomSearch(option){
        if(searchT){ loadSec() } else { searchSec(option) }

        Keyboard.dismiss()
    };

    const loadSec = async() =>{
        if (searchT){
            setList(data)
            setSearchT(false)
            setSearchText('')
        }
        
        const response = await api.get(`/${nameSec}/`,{
            withCredentials: true,
            headers: {
                'Authorization': 'Basic '+authBasic,
                'VENDEDOR': dataUser.cod_vendedor,
                'page': page,
                'pageSize': 10
            } 
        })

        setList([...list, ...response.data["items"]])
        setPage(page+1)
    };
    
    const searchSec = async(option) =>{
        if (searchText==='') return;

        setListSearch([])
        setList(data)

        let params = {
            'Authorization': 'Basic '+authBasic,
            'VENDEDOR': dataUser.cod_vendedor,
            'ORIGEMAPP': "S",
            'page': 1,
            'pageSize': 2000,
        };

        let opt_new = option.split(":");
        
        switch (opt_new[0]) {
            case "nome_fantasia":
                params.nome_fantasia = opt_new[1];
                break;
            case "razao_social":
                params.razao_social = opt_new[1];
                break;
            case "cnpj":
                params.cnpj = opt_new[1];
                break;
            default:
                break;
        }

        let aResult = [];

        try{
            setLoad(true)
            const response = await api.get(`/${nameSec}/`,{headers: params})
            if(_.has(response.data,"Erro")){
                aResult = [];
            }else{
                if(response.data.items){
                    response.data["items"].forEach((element, index) => {
                      aResult.push({index: index, ...element});
                    });
                  }else{
                    aResult.push(response.data);
                }
            }
            
        }catch(error){
            alert(error)
        }
        
        setListSearch(aResult)
        setSearchT(true)
        setLoad(false)
    };


    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>
                <View style={styles.headerSales}>  
                    <TouchableOpacity onPress={()=>{navigation.navigate('Detail',{
                        nameSec:dataBack[0],
                        data:dataBack[1],
                        dataUser:dataBack[2],
                        filter:dataBack[3],
                        dataBack: dataBack[4]
                    })}}>
                        <Image source={typeIcons[2]} />
                    </TouchableOpacity>

                    <Text style={{fontSize:24,fontWeight:'bold', color:'#fff'}}>Selecione o Cliente</Text>
                </View> 

                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onChangeText={(t) => setSearchText(t)}
                    />

                    {load ? 
                        <View style={{flex:1,flexDirection:'row',top:5,right:30}}>
                            <ActivityIndicator color={'#000000'} size={30}/>
                        </View>
                        :
                        <TouchableOpacity style={{right:30}} onPress={()=>{buttomSearch(`${checked}:${searchText}`)}}>
                            <Image 
                                style={{resizeMode:'contain', width:30}}
                                source={searchT?typeIcons[15]:typeIcons[4]}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => { setVisibleFilter(true) }}>
                        <Image 
                            style={{resizeMode:'contain', width:30}}
                            source={checked==''?typeIcons[16]:typeIcons[17]}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={searchT 
                        ? listSearch.sort((a, b) => b.id.localeCompare(a.id))
                        : list.sort((a, b) => b.id.localeCompare(a.id))
                    }
                    renderItem={({item})=> 
                        <Section
                            item={item}
                            nameSec={nameSec}
                            vendedor={dataUser.cod_vendedor}
                            dataBack={[nameSec,list,dataUser,filter]}
                        />
                    }

                    onEndReached={searchT?null:loadSec}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Registro não encontrado</Text>
                        </View>
                    }
                />
                
            </View>


            <ModFilter visibleFilter={visibleFilter}>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={{ fontSize: 30,color:'#2F8BD8'}}>Filtro</Text>

                        <TouchableOpacity onPress={() => setVisibleFilter(false)}>
                            <Image
                                source={typeIcons[15]}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{marginVertical:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <RadioButton
                            value="razao_social"
                            status={ checked === 'razao_social' ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked('razao_social');setVisibleFilter(false)}}
                        />
                        <Text>Razão Social</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <RadioButton
                            value="nome_fantasia"
                            status={ checked === 'nome_fantasia' ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked('nome_fantasia');setVisibleFilter(false)}}
                        />
                        <Text>Nome Fantasia</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <RadioButton
                            value="cnpj"
                            status={ checked === 'cnpj' ? 'checked' : 'unchecked' }
                            onPress={() => {setChecked('cnpj');setVisibleFilter(false)}}
                        />
                        <Text>CNPJ</Text>
                    </View>
                </View>
            </ModFilter>

        </SafeAreaView>
        
    )
}

