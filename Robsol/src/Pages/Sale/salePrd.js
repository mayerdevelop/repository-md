import React,{useState, useContext, useEffect} from 'react';
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

import ModFilter from '../../Modal/modFilter';
import ModScan from '../../Modal/modScan';

import {CartContext} from '../../Contexts/cart';

import Section from '../../Components/Sections';

import {BarCodeScanner} from 'expo-barcode-scanner';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default function SalePrd({route,navigation}){

    const { addCart,cart,visibleCart,totalCart } = useContext(CartContext)

    const { nameSec,data,dataUser,filter,dataBack,prdProd } = route.params;

    const [searchText, setSearchText] = useState('');
    const [searchT,setSearchT] = useState(false);
    const [listSearch,setListSearch] = useState([]);
    const [list, setList] = useState(data);
    const [page, setPage] = useState(2);
    const [checked, setChecked] = useState(filter);
    const [load, setLoad] = useState(false);

    const [visibleFilter, setVisibleFilter] = useState(false);
    const [visibleScan, setVisibleScan] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState('');

    const authBasic = 'YWRtaW46QVZTSTIwMjI';


    const askForCameraPermission = () =>{
        (async () =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    useEffect(()=> {
        askForCameraPermission();
    },[])


    const handleBarCodeScanned = async({type, data}) =>{
        setScanned(true);
        setTextScan(data);
        //console.log('Type: '+ type + '\nData: ' + data)


        const response = await api.get(`/Products/`,{
            withCredentials: true,
            headers: {
                'Authorization': 'Basic '+authBasic,
                'VENDEDOR': dataUser.cod_vendedor,
                'page': 1,
                'pageSize': 10,
                'CODIGO':data
            } 
        });

        const item = response.data["items"][0]

        if (item.length !== 0){

          tst(item)
            
       }
      
    }

    function tst(item){

        let vlrTotal = 0

        const copyCart = [...cart];
        const result = copyCart.find((product) => product.id === parseInt(item.id));
        
        console.log(copyCart)
        if(!result){

            vlrTotal = parseFloat(item.preco.trim().replace(',', '.'))

            copyCart.push({
                id: parseInt(item.id),
                QUANTIDADE: 1,
                PRODUTO: item.codigo.trim(),
                DESCRICAO: item.descricao.trim(), 
                VALOR: item.preco.trim(),
                TOTAL: vlrTotal
            });

            console.log(JSON.stringify(copyCart))
            setScanned(false)
            addCart(copyCart)
            visibleCart(true)
            setVisibleScan(false)
        };
    }
    

    if (hasPermission === null){
        <View>
            <Text>Requesting for camera permission</Text>
        </View>
    }

    if(hasPermission === false){
        <View>
            <Text style={{margin:10}}>no access to camera</Text>
            <TouchableOpacity onPress={()=> askForCameraPermission()}>
                <Text>Allow Camera</Text>
            </TouchableOpacity>
        </View>
    }


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


    return( 

        <SafeAreaView style={styles.contSafe}>
            <View style={styles.container}>
                <View style={styles.headerSales}>  
                    <TouchableOpacity onPress={()=>{addCart([]),totalCart(0),navigation.navigate('SaleCli',{
                        nameSec:dataBack[0],
                        data:dataBack[1],
                        dataUser:dataBack[2],
                        filter:dataBack[3],
                    })}}>
                        <Image source={typeIcons[2]} />
                    </TouchableOpacity>

                    <Text style={{fontSize:24,fontWeight:'bold', color:'#fff'}}>Selecione o Produto</Text>
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
                            prdProd={prdProd}
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

            <View style={styles.footerContent}>
                <TouchableOpacity style={styles.imageContent} onPress={()=>{visibleCart(true)}}>
                    <Image style={{resizeMode:'contain',width:35}} source={typeIcons[18]}/>
                    <Text style={styles.titleButtom}>Cart</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.imageContent} onPress={()=>{ /*setVisibleScan(true)*/ }}>
                    <Image style={{resizeMode:'contain',width:35}} source={typeIcons[19]}/>
                    <Text style={styles.titleButtom}>Scan</Text>
                </TouchableOpacity>
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
            
                <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:7}}>
                    <View style={{marginVertical:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="CODIGO"
                                status={ checked === 'CODIGO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('CODIGO');setVisibleFilter(false)}}
                            />
                            <Text>Código</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="DESCRICAO"
                                status={ checked === 'DESCRICAO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('DESCRICAO');setVisibleFilter(false)}}
                            />
                            <Text>Descrição</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="LINHA"
                                color='#000'
                                status={ checked === 'LINHA' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('LINHA');setVisibleFilter(false)}}
                            />
                            <Text>Linha</Text>
                        </View>
                    </View>

                    <View style={{marginVertical:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="MARCA"
                                status={ checked === 'MARCA' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('MARCA');setVisibleFilter(false)}}
                            />
                            <Text>Marca</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="MATERIAL"
                                status={ checked === 'MATERIAL' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('MATERIAL');setVisibleFilter(false)}}
                            />
                            <Text>Material</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RadioButton
                                value="GENERO"
                                status={ checked === 'GENERO' ? 'checked' : 'unchecked' }
                                onPress={() => {setChecked('GENERO');setVisibleFilter(false)}}
                            />
                            <Text>Gênero</Text>
                        </View>
                    </View>
                </View>
            </ModFilter>

            <ModScan visibleScan={visibleScan}>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                        <Text style={{ fontSize: 30,color:'#2F8BD8'}}>Scan</Text>

                        <TouchableOpacity onPress={() => setVisibleScan(false)}>
                            <Image
                                source={typeIcons[15]}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={styles.barCodeBox}>
                        <BarCodeScanner 
                            onBarCodeScanned={scanned?undefined:handleBarCodeScanned}
                            style={styles.scanBox}
                        />
                    </View>

                    <Text>{textScan}</Text>

                    {scanned && 
                        <TouchableOpacity onPress={()=> setScanned(false)}>
                            <Text>Scan again</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ModScan>

        </SafeAreaView>
        
    )
}

