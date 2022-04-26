import React,{useState,useEffect,useRef} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Keyboard,
    Modal,
    Animated,
    ActivityIndicator,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import _ from 'underscore';

import styles from './styles';

import {decode, encode} from 'base-64';
import typeIcons from '../../utils/typeIcons'
import api from '../../services/api'
import Footer from '../../Components/Footer';
import Section from '../../Components/Sections';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function Detail({route,navigation}){

    const { nameSec,data,dataUser,filter,icon } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);
    const [list, setList] = useState(data);
    const [page, setPage] = useState(2);
    const [footerEnable,setFooterEnable] = useState(true)
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(filter);
    const [load, setLoad] = useState(false);

    const authBasic = 'YWRtaW46QVZTSTIwMjI';


    function buttomSearch(option){
        if(searchT){ loadSec() } else { searchSec(option) }

        Keyboard.dismiss()
        setFooterEnable(true)
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
            case "CODIGO":
                params.codigo = opt_new[1];
                break;
            case "DESCRICAO":
                params.descricao = opt_new[1];
                break;
            case "LINHA":
                params.linha = opt_new[1];
                break;
            case "MARCA":
                params.marca = opt_new[1];
                break;
            case "MATERIAL":
                params.material = opt_new[1];
                break;
            case "GENERO":
                params.genero = opt_new[1];
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

    const ModalPoup = ({visible, children}) => {

        const [showModal, setShowModal] = useState(visible);
        const scaleValue = useRef(new Animated.Value(0)).current;

        useEffect(() => {
        
            let cancel = false;

            if (cancel) return; 

            toggleModal()
            
        return () => { 
            cancel = true;
        }
            
        }, [visible]);

        const toggleModal = () => {

            if (visible) {
                setShowModal(true);

                Animated.spring(scaleValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();

            } else {
                setTimeout(() => setShowModal(false), 200);
                
                Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        };
        
        return (
            <Modal transparent visible={showModal}>
                <View style={styles.modalBackGround}>
                    <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
            );
    };



    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={[styles.container,footerEnable && { marginBottom:100,} ]}>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#888"
                        value={searchText}
                        onFocus={()=>{setFooterEnable(false)}}
                        onSubmitEditing={()=>{setFooterEnable(true)}}
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
                                source={searchT?typeIcons[32]:typeIcons[6]}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={() => { setVisible(true) }}>
                        <Image 
                            style={{resizeMode:'contain', width:30}}
                            source={checked==''?typeIcons[33]:typeIcons[34]}
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

            { footerEnable ? <Footer navigation={navigation} dataUser={dataUser} backPage={'Detail'} icon={icon}/> : <></> }

            <ModalPoup visible={visible}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 30,color:'#2F8BD8'}}>Filtro</Text>

                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                                source={typeIcons[32]}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                { nameSec == 'Customers' &&
                    <View style={{marginVertical:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="razao_social"
                                status={ checked === 'razao_social' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('razao_social');setVisible(false)}}
                            />
                            <Text>Razão Social</Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="nome_fantasia"
                                status={ checked === 'nome_fantasia' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('nome_fantasia');setVisible(false)}}
                            />
                            <Text>Nome Fantasia</Text>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="cnpj"
                                status={ checked === 'cnpj' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('cnpj');setVisible(false)}}
                            />
                            <Text>CNPJ</Text>
                        </View>
                    </View>
                }

            { nameSec == 'Products' &&
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:7}}>
                        <View style={{marginVertical:20}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="CODIGO"
                                    status={ checked === 'CODIGO' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('CODIGO');setVisible(false)}}
                                />
                                <Text>Código</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="DESCRICAO"
                                    status={ checked === 'DESCRICAO' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('DESCRICAO');setVisible(false)}}
                                />
                                <Text>Descrição</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="LINHA"
                                    color='#000'
                                    status={ checked === 'LINHA' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('LINHA');setVisible(false)}}
                                />
                                <Text>Linha</Text>
                            </View>
                        </View>

                        <View style={{marginVertical:20}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="MARCA"
                                    status={ checked === 'MARCA' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('MARCA');setVisible(false)}}
                                />
                                <Text>Marca</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="MATERIAL"
                                    status={ checked === 'MATERIAL' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('MATERIAL');setVisible(false)}}
                                />
                                <Text>Material</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <RadioButton
                                    value="GENERO"
                                    status={ checked === 'GENERO' ? 'checked' : 'unchecked' }
                                    onPress={() => {setChecked('GENERO');setVisible(false)}}
                                />
                                <Text>Gênero</Text>
                            </View>
                        </View>
                    </View>
                    
                }
                
            </ModalPoup>
        </SafeAreaView>
        
    )
}

