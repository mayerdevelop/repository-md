import React, {useRef, useState, useEffect} from "react";
import { 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput
} 
from 'react-native'

import { FontAwesome,Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import Footer from "../../components/footer/footer";

import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker'

import api from '../../services/api';
import { Audio } from 'expo-av';

import ModObs from '../../modal/modObs';

export default function List(){

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [textScan, setTextScan] = useState('');
    const [projetoOpen, setProjetoOpen] = useState(false);
    const [projetoValue, setProjetoValue] = useState(null);
    const [vacinaOpen, setVacinaOpen] = useState(false);
    const [vacinaValue, setVacinaValue] = useState('1');
    const [coreOpen, setCoreOpen] = useState(false);
    const [coreValue, setCoreValue] = useState(null);
    const [professorOpen, setProfessorOpen] = useState(false);
    const [professorValue, setProfessorValue] = useState(null);
    const [listId, setListId] = useState('')
    const [current, setCurrent] = useState('list')
    const [qrcode, setQrcode] = useState(true)
    const [list, setList] = useState([])
    const [alllists, setAlllists] = useState([])
    const [searchText, setSearchText] = useState('');
    const [listAllAlunos, setListAllAlunos] = useState([]);
    const [listAlunos, setListAlunos] = useState(listAllAlunos);
    const [loadAlunos, setLoadAlunos] = useState(true)
    const lottieRef = useRef(null)
    const [sound, setSound] = useState();
    const [visibleObs,setVisibleObs] = useState(false);
    const [currentStudent, setCurrentStudent] = useState('1')
    const [alunoDetail, setAlunoDetail] = useState(null)

    let pending = true
    
    const [projeto, setProjeto] = useState([
        { label: "Pequeno Dragão", value: "0" },
        { label: "Informática", value: "1" },
        { label: "Reforço Escolar", value: "2" },
        { label: "Maria Rosa", value: "3" },
        { label: "Turma Regular", value: "4" },
    ]);

    const [vacina, setVacina] = useState([
        { label: "Não", value: "1" },
        { label: "Sim", value: "2" },
    ]);
    
    const [professor, setProfessor] = useState([
        { label: "Prof. Jane", value: "0" },
        { label: "Prof. Julia", value: "1" },
        { label: "Prof. Alexandre", value: "2" },
        { label: "Felipe (informatica)", value: "3" },
    ]);

    const [coreSelect, setCoreSelect] = useState([
        { label: "Padroeira", value: "1" },
        { label: "Piratininga", value: "2" },
    ]);

    const allproj = ["Pequeno Dragão","Informática","Reforço Escolar","Maria Rosa","Turma Regular"]
    const mesAno = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    const semana = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    const core = [null,'Padroeira','Piratininga']

    const data = new Date()

    const dia = data.getDate().toString().padStart(2, '0')
    const mes = (data.getMonth()+1).toString().padStart(2, '0')
    const ano = data.getFullYear().toString()


    async function playSound() {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/confirm.mp3')
        );
        setSound(sound);
    
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);


    const getAlunos = async () => {
        setLoadAlunos(true)
        try{
            const response = await api.get(`/alunos/all`);

            if(response.data.message !== 'error'){

                if(response.data.item.length !== 0){    
                    let copyAllList = []
                    response.data.item.map((element) => {
                        copyAllList.push({
                            id: element._id,
                            name: element.name,
                            age: element.age,
                            core: element.core,
                            status: element.status,
                            birth: element.birth,
                            rg: element.rg,
                            cpf: element.cpf,
                            clothing: element.clothing,
                            shoe: element.shoe,
                            school: element.school,
                            schoolName: element.schoolName,
                            guardian: element.guardian,
                            guardianCpf: element.guardianCpf,
                            guardianCel: element.guardianCel,
                            guardianNis: element.guardianNis,
                            vaccineCard: element.vaccineCard,
                            income: element.income
                        })
                    })
            
                    setListAllAlunos(copyAllList)
                    setListAlunos(copyAllList)
                }else{
                    setListAllAlunos([])
                }        
            }else{
                setListAllAlunos([])
            }

        }catch(error){
            console.log(error)
            setListAllAlunos([])
        }

        setLoadAlunos(false)
    };


    useEffect(() => {
        if (searchText === '') {
            setListAlunos(listAllAlunos)
            handleOrderClick()
        }else{
            setListAlunos(
                listAllAlunos.filter((item) =>
                    item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
          );
        }
      }, [searchText]);


      const handleOrderClick = () => {
        let newList = [...listAllAlunos];
    
        newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    
        setListAlunos(newList);
      };


    const getAlllists = async () => {
        
        try{
            const response = await api.get(`/lists/getlists/all`);

            if(response.data.message !== 'error'){

                if(response.data.item.length !== 0){    
                    let copyAllList = []
                    response.data.item.map((element) => {
                        copyAllList.push({
                            id: element._id,
                            project: element.project,
                            teacher: element.teacher,
                            date: element.date,
                            students: element.students
                        })
                    })
            
                    setAlllists(copyAllList)
                }else{
                    setAlllists([])
                }        
            }else{
                setAlllists([])
            }

        }catch(error){
            console.log(error)
            setAlllists([])
        }
    
    };

    useEffect(() => {
        getAlllists()
    }, [])

    useEffect(() => {
        if (pending) lottieRef.current?.play()
        else lottieRef.current?.reset()
    }, [pending])
    

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
    }, []);
    
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        try{
            const response = await api.get(`/alunos/filter/${data}`);

            if(response.data.message === 'error'){
                setTextScan('Aluno não encontrado na base de dados')

            }else {
                if(response.data.item.length === 0){
                    setTextScan('Aluno não encontrado na base de dados')
                }else {
                    setTextScan(response.data.item[0].name)

                    let copyList = [...list]
                    
                    response.data.item.map((element) => {
                        copyList.push({
                            id: element._id,
                            name: element.name,
                            age: element.age,
                            core: element.core
                        })
                    })

                    copyList = copyList.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                    }, Object.create(null))
                                        
                    setList(copyList)
                    playSound()
                }                
            }

        }catch(error){
            console.log(error)
            setTextScan('Aluno não encontrado na base de dados')
        }
    };


    const addAlunoList = (aluno) => {
        let copyList = [...list]
                    
        copyList.push(aluno)

        copyList = copyList.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))
                            
        setList(copyList)
        playSound()
    }


    if (hasPermission === null) {
        return <Text>Solicitando permissão de câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }


    const setPageCurrent = (page) => {
        setCurrent(page)

        if(page === 'alllists'){getAlllists()}
        if(page === 'students'){getAlunos()}
    }

    const extractKey = ({students}) => students
    
    const renderItem = ({item}) => {
        let items = [];
        if(item.students && listId === item.id) {
          items = item.students.map(row => {
            return (
                <>
                    <TouchableOpacity style={{
                        backgroundColor:'#fff',
                        height:80,
                        marginVertical:7,
                        justifyContent:'space-between',
                        marginHorizontal:20,
                        borderRadius:22,
                        padding:10,
                        paddingHorizontal:20,
                        shadowColor: "#000",
                        shadowOffset: {width: 0,height: 3},
                        shadowOpacity: 0.12,
                        shadowRadius: 1.84,
                        elevation: 5,
                    }}> 
                        <View>
                            <Text style={{fontWeight:'600'}}>{row.name}</Text>
                            <Text style={{fontWeight:'500', color:'#c00c0c'}}>{row.age} anos</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'500', color:'#c00c0c', opacity:0.6}}>Núcleo: </Text>
                            <Text style={{fontWeight:'500', opacity:0.6}}>{core[parseInt(row.core)]}</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )
          })
        } 
  
        return (
          <View>
            {items}
          </View>
        )
    }

    const novaLista = () => {

        if(projetoValue === null){
            alert('Necessário selecionar o projeto')
        }else {
            setVisibleObs(true)
            setScanned(false)
            setTextScan('')
        }
    }


    const encerralista = async() => {
        let lOk = true

        if(projetoValue === null && lOk){
            alert('Necessário selecionar o projeto')
            lOk = false
        }

        if(professorValue === null && lOk){
            alert('Necessário selecionar o professor')
            lOk = false
        }

        if(lOk){

            try{
                const response = await api.post("/alunos/postlist", {
                    project: projetoValue,
                    teacher: professor[parseInt(professorValue)].label,
                    date:ano+mes+dia,
                    students:list
                });
    
                if (response.data.message === 'sucesso') {
                    
                    alert('Lista de chamada gerada com sucesso')
                    setList([])
                    setProjetoValue(null)
                    setProfessorValue(null)

                } else {
                    alert('erro na geração da lista, contate o administrador')
                } 
            
            } catch(error){
                console.log(error)
                alert('erro na geração da lista, contate o administrador')
            }


        }
    }

    const onClickItemModal = () => {
        if(current === 'list'){
            setVisibleObs(true)
            setScanned(false)
            setTextScan('')
        }
    }

    const onClickAlunoDetal = (item) => {
        setCoreValue(item.core)
        setAlunoDetail(item)
        setVisibleObs(true)
    }

    const onClickCloseModal = () => {
        setVisibleObs(false)
        setCoreValue(null)
        setAlunoDetail(null)
        setCurrentStudent('1')
        setTextScan('')
        setScanned(false)
        setListId('')
    }
      

    return(
        <>
        <SafeAreaView style={{flex:0, backgroundColor:'#c00c0c'}} />
        <SafeAreaView style={{
            flex:1,
            backgroundColor: '#F8FAFC',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <View style={{
                width:'100%',
                backgroundColor:'#c00c0c',
                height:current === 'list' ? 110 : 80,
                borderBottomEndRadius:30,
                borderBottomStartRadius:30,
                justifyContent:'center',
                paddingHorizontal:30,
                position:'relative',
                zIndex:10,

            }}> 
                { current === 'list' &&
                <>
                    <DropDownPicker
                        open={projetoOpen}
                        value={projetoValue}
                        items={projeto}
                        setOpen={setProjetoOpen}
                        setValue={setProjetoValue}
                        setItems={setProjeto}
                        placeholder="Selecione um projeto"
                        zIndex={1000}
                        zIndexInverse={3000}
                        style={{borderWidth:0,backgroundColor:'#c00c0c',width:'100%'}}
                        dropDownContainerStyle={{borderWidth:0,backgroundColor:'#c00c0c',width:'100%'}}
                        textStyle={{color:'#fff', fontWeight:'bold', fontSize:26}}
                        theme="DARK"
                    />

                    <Text style={{color:'#fff',fontSize:14, left:10, fontWeight:'bold',marginBottom:10}}>
                        {semana[data.getDay()]}. {dia} de {mesAno[data.getMonth()]}
                    </Text>
                </>
                }
                
                { current === 'alllists' &&
                <>
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:26}}>Listas de Chamadas</Text>
                </>
                }

                { current === 'students' &&
                <>
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:26}}>Listas de Alunos</Text>
                </>
                }

                { ((!projetoOpen && list.length > 0 && current === 'list') || current === 'students') &&
                    <TouchableOpacity 
                        onPress={onClickItemModal}
                        style={{
                            borderRadius:100,
                            width:80,
                            height:80,
                            backgroundColor:'#ffffff',
                            alignItems:'center',
                            justifyContent:'center',
                            top:current === 'list' ? 65 : 30,
                            borderColor:'#c00c0c',
                            borderWidth:2,
                            position:'absolute',
                            right:25
                        }}
                    >   
                        { current === 'students' 
                            ? <FontAwesome name="plus" size={40} color="black" />
                            : <FontAwesome name="qrcode" size={45} color="black" />
                        }
                    </TouchableOpacity>
                }

            </View>
            
            <View style={{
                flex:1,
                backgroundColor:'#F8FAFC',
                width:'100%',
                marginVertical:20,
            }}>
                { current === 'list' &&
                    <>
                    { list.length > 0 &&

                        <TouchableOpacity
                            onPress={encerralista}
                            style={{
                                marginBottom:20,
                                backgroundColor:'#fff',
                                width:'55%',
                                height:50,
                                alignItems:'center',
                                flexDirection:'row',
                                paddingLeft:25,
                                borderBottomRightRadius:25,
                                borderTopRightRadius:25,
                                shadowColor: "#000",
                                shadowOffset: {width: 0,height: 2},
                                shadowOpacity: 0.20,
                                shadowRadius: 1.84,
                                elevation: 5,
                            }}
                        >
                            <Feather name="check-square" size={24} color="#FEB43D" />
                            <Text style={{fontSize:22,fontWeight:'bold',color:'#FEB43D',marginLeft:10}}>Encerrar lista</Text>

                        </TouchableOpacity>

                    }

                    <FlatList
                        data={list.sort((b, a) => b.name.localeCompare(a.name))}
                        renderItem={({item})=> 
                            <TouchableOpacity style={{
                                backgroundColor:'#fff',
                                height:80,
                                marginVertical:7,
                                justifyContent:'space-between',
                                marginHorizontal:20,
                                borderRadius:22,
                                padding:10,
                                paddingHorizontal:20,
                                shadowColor: "#000",
                                shadowOffset: {width: 0,height: 3},
                                shadowOpacity: 0.12,
                                shadowRadius: 1.84,
                                elevation: 5,
                            }}> 
                                <View>
                                    <Text style={{fontWeight:'600'}}>{item.name}</Text>
                                    <Text style={{fontWeight:'500', color:'#c00c0c'}}>{item.age} anos</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'500', color:'#c00c0c', opacity:0.6}}>Núcleo: </Text>
                                    <Text style={{fontWeight:'500', opacity:0.6}}>{core[parseInt(item.core)]}</Text>
                                </View>
                                

                            </TouchableOpacity>
                        }

                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <View style={{marginHorizontal:25}}>
                                <View style={{alignItems:'center',marginTop:30}}>
                                    <Text style={{fontSize:22,fontWeight:'600'}}>LISTA DE CHAMADA VAZIA</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={()=>{novaLista()}}
                                    style={{
                                        backgroundColor:'#c00c0c',
                                        alignItems:'center',
                                        opacity:0.85,
                                        justifyContent:'center',
                                        marginTop:30,
                                        height:55,
                                        marginHorizontal:'30%',
                                        borderRadius:40,
                                        shadowColor: "#000",
                                        shadowOffset: {width: 0,height: 2},
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Nova lista</Text>
                                </TouchableOpacity>

                                <LottieView
                                    ref={lottieRef}
                                    source={require('../../../assets/ghost.json')}
                                    renderMode={"SOFTWARE"}
                                    style={{width:'100%',}}
                                    autoPlay
                                    loop
                                /> 
                            </View>
                        }
                    />
                    </>
                }

                { current === 'alllists' &&
                    <>
                    <FlatList
                        data={alllists.sort((a, b) => b.date.localeCompare(a.date))}
                        renderItem={({item})=> 
                            <TouchableOpacity 
                                onPress={()=>{setVisibleObs(true),setListId(item.id)}}
                                style={{
                                    backgroundColor:'#fff',
                                    height:80,
                                    marginVertical:7,
                                    justifyContent:'space-between',
                                    marginHorizontal:20,
                                    borderRadius:22,
                                    padding:10,
                                    paddingHorizontal:20,
                                    shadowColor: "#000",
                                    shadowOffset: {width: 0,height: 3},
                                    shadowOpacity: 0.12,
                                    shadowRadius: 1.84,
                                    elevation: 5,
                                }}
                            > 
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{allproj[parseInt(item.project)]}</Text>
                                    <Text style={{fontWeight:'bold',color:'#c00c0c'}}>{item.date.substring(6,8)+'/'+item.date.substring(4,6)+'/'+item.date.substring(0,4)}</Text>
                                </View>
                                
                                <Text style={{fontWeight:'bold',fontSize:22}}>{item.teacher}</Text>

                            </TouchableOpacity>
                        }

                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <View style={{marginHorizontal:25,alignItems:'center'}}>
                                <View style={{alignItems:'center',marginTop:50}}>
                                    <Text style={{fontSize:22,fontWeight:'600',textAlign:'center'}}>Não há listas de chamadas cadastradas!</Text>
                                </View>

                                <LottieView
                                    ref={lottieRef}
                                    source={require('../../../assets/ghost.json')}
                                    renderMode={"SOFTWARE"}
                                    style={{width:'100%',}}
                                    autoPlay
                                    loop
                                /> 
                            </View>
                        }
                    />
                    </>
                }

                { current === 'students' &&
                    <>{loadAlunos ?
                        <View style={{alignItems:'center'}}>
                            <ActivityIndicator color={'#000000'} size={50}/>
                            <Text style={{color:'#c00c0c',fontSize:16,fontWeight:'bold'}}>Buscando Alunos...</Text>
                        </View>
                    :
                    <FlatList
                        data={listAlunos}
                        renderItem={({item})=> 
                            <TouchableOpacity 
                                onPress={() => {onClickAlunoDetal(item)}}
                                style={{
                                    backgroundColor:'#fff',
                                    height:80,
                                    marginVertical:7,
                                    marginTop:25,
                                    justifyContent:'space-between',
                                    marginHorizontal:20,
                                    borderRadius:22,
                                    padding:10,
                                    paddingHorizontal:20,
                                    shadowColor: "#000",
                                    shadowOffset: {width: 0,height: 3},
                                    shadowOpacity: 0.12,
                                    shadowRadius: 1.84,
                                    elevation: 5,
                                }}
                            > 
                                <View>
                                    <Text style={{fontWeight:'600'}}>{item.name}</Text>
                                    <Text style={{fontWeight:'500', color:'#c00c0c'}}>{item.age} anos</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontWeight:'500', color:'#c00c0c', opacity:0.6}}>Núcleo: </Text>
                                    <Text style={{fontWeight:'500', opacity:0.6}}>{core[parseInt(item.core)]}</Text>
                                </View>
                                

                            </TouchableOpacity>
                        }

                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <View style={{marginHorizontal:25,alignItems:'center'}}>
                                <View style={{alignItems:'center',marginTop:50}}>
                                    <Text style={{fontSize:22,fontWeight:'600',textAlign:'center'}}>Não há alunos cadastrados</Text>
                                </View>

                                <LottieView
                                    ref={lottieRef}
                                    source={require('../../../assets/ghost.json')}
                                    renderMode={"SOFTWARE"}
                                    style={{width:'100%',}}
                                    autoPlay
                                    loop
                                /> 
                            </View>
                        }
                    />}
                    </>
                }
            </View>

            
           <Footer current={current} setPageCurrent={setPageCurrent}/>
        </SafeAreaView>

        <ModObs visibleObs={visibleObs}>
            <View style={{
                flex:1,
                justifyContent:'flex-start',
                alignItems:'center',
                height:700,
                backgroundColor:'#F8FAFC',
            }}>
                
                <View style={{
                    flexDirection:'row',
                    justifyContent:(current === 'list' || current === 'students') ? 'space-around' : 'space-between',
                    alignItems:'center',
                    padding:20,
                    width:'100%',
                    zIndex:100
                }}>
                    {current === 'list' && 
                        <DropDownPicker
                            open={professorOpen}
                            value={professorValue}
                            items={professor}
                            setOpen={setProfessorOpen}
                            setValue={setProfessorValue}
                            setItems={setProfessor}
                            placeholder="Selecione um professor"
                            zIndex={1000}
                            zIndexInverse={3000}
                            style={{borderWidth:0,backgroundColor:'#F8FAFC',width:'70%'}}
                            dropDownContainerStyle={{borderWidth:0,backgroundColor:'#F8FAFC',width:'70%'}}
                            textStyle={{fontWeight:'bold', fontSize:16}}
                            theme="LIGHT"
                        />
                    }

                    {current === 'alllists' && <Text style={{fontSize:20,fontWeight:'bold'}}>Lista de alunos</Text>}
                    
                    {current === 'students' && 
                        <DropDownPicker
                            open={coreOpen}
                            value={coreValue}
                            items={coreSelect}
                            setOpen={setCoreOpen}
                            setValue={setCoreValue}
                            setItems={setCoreSelect}
                            placeholder="Núcleo"
                            zIndex={1000}
                            zIndexInverse={3000}
                            style={{borderWidth:0,backgroundColor:'#F8FAFC',width:'40%'}}
                            dropDownContainerStyle={{borderWidth:0,backgroundColor:'#F8FAFC',width:'40%'}}
                            textStyle={{fontWeight:'bold', fontSize:16}}
                            theme="LIGHT"
                        />
                    }

                    <TouchableOpacity onPress={()=>{onClickCloseModal()}}>
                        <FontAwesome name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                { current === 'list' &&
                <>  

                    <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
                        { qrcode &&
                        <>
                        <View style={{
                            backgroundColor:'#c00c0c',
                            borderRadius:40,
                            paddingVertical:15,
                            width:'50%',
                            padding:15,
                        }}>
                            <TouchableOpacity
                                onPress={()=>{setQrcode(false), getAlunos()}}
                                style={{justifyContent:'center',alignItems:'center'}}
                            >
                                <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>Buscar por nome</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            alignItems:'center',
                            justifyContent:'center',
                            height:280,
                            width:280,
                            marginVertical:20,
                        }}>
                            <BarCodeScanner 
                                onBarCodeScanned={scanned?undefined:handleBarCodeScanned}
                                style={{height:'100%',width:'100%'}}
                            />
                            
                        </View>

                        <Text style={{fontSize:18,fontWeight:'600',color:'#FEB43D'}}>{textScan}</Text>
                        </>
                        }

                        { !qrcode &&
                            <>
                                { loadAlunos ?
                                    <View>
                                        <ActivityIndicator color={'#000000'} size={50}/>
                                        <Text style={{color:'#c00c0c',fontSize:16,fontWeight:'bold'}}>Buscando Alunos...</Text>
                                    </View>
                                :
                                <View style={{width:'100%',height:'100%'}}>
                                   <View style={{height:'80%'}}>
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems: 'center',
                                            justifyContent:'space-between',
                                            marginHorizontal:30
                                        }}>
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    height: 50,
                                                    marginRight: 30,
                                                    borderBottomWidth:1,
                                                    borderRadius: 5,
                                                    fontSize: 19,
                                                    paddingLeft: 10,
                                                    paddingRight: 15,
                                                    color: '#000',
                                                }}
                                                placeholder="Pesquisar..."
                                                placeholderTextColor="#000"
                                                value={searchText}
                                                onChangeText={(t) => setSearchText(t)}
                                            />

                                            <TouchableOpacity 
                                                onPress={()=>{setQrcode(true)}}
                                                style={{
                                                    borderRadius:100,
                                                    width:50,
                                                    height:50,
                                                    backgroundColor:'#ffffff',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    borderColor:'#c00c0c',
                                                    borderWidth:2,
                                                }}
                                            >
                                                <FontAwesome name="qrcode" size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>

                                        <FlatList
                                            data={listAlunos}
                                            style={{marginTop:30}}
                                            renderItem={({ item }) => 
                                                <TouchableOpacity
                                                    onPress={()=>{addAlunoList(item)}}
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginHorizontal:30,
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: '#999',
                                                        paddingVertical:10
                                                    }}
                                                >
                                                    <View>
                                                        <Text style={{fontSize: 20,color: '#000',marginBottom: 5}}>{item.name}</Text>
                                                        <Text style={{fontSize: 16,color: '#c00c0c'}}>{item.age} anos</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={(item) => item.id}
                                        />
                                    </View>
                                </View>
                                }
                            
                            
                            </>

                        }
                    </View>

                    {scanned &&

                        <View style={{
                            backgroundColor:'#c00c0c',
                            borderRadius:40,
                            paddingVertical:15,
                            width:'40%',
                            position:'absolute',
                            bottom:100
                        }}>
                            <TouchableOpacity 
                                onPress={()=> {setScanned(false),setTextScan('')}}
                                style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                }}
                            >
                                <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </>
                }
                { current === 'alllists' &&
                
                <View style={{
                    flex:1,
                    backgroundColor:'#F8FAFC',
                    width:'100%',
                    marginVertical:20,
                }}>
                    <FlatList
                        data={alllists}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                
                </View>
                }

                { current === 'students' && !!alunoDetail &&
                    <View style={{
                        flex:1,
                        backgroundColor:'#F8FAFC',
                        width:'90%'
                    }}>
                        
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                            <View 
                                style={{
                                    borderRadius:100,
                                    width:100,
                                    height:100,
                                    backgroundColor:'#ffffff',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderColor:'#c00c0c',
                                    borderWidth:2,
                                }}
                            >
                            </View>
                            
                            <View style={{
                                marginLeft:20,
                                justifyContent:'space-between',
                                flex:1
                            }}>

                                <View>
                                    <Text>Nome:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:14}}>{alunoDetail.name}</Text>
                                </View>

                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <Text>Idade:</Text>
                                        <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{alunoDetail.age} anos</Text>
                                    </View>

                                    <View>
                                        <Text>Nascimento:</Text>
                                        <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{alunoDetail.birth.substring(6,8)+'/'+alunoDetail.birth.substring(4,6)+'/'+alunoDetail.birth.substring(0,4)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={{
                            marginTop:40,
                            paddingHorizontal:25,
                            justifyContent:'space-around',
                            flexDirection:'row'
                        }}>
                            
                            <TouchableOpacity
                                onPress={()=>{setCurrentStudent('1')}}
                                style={{
                                    borderBottomWidth:currentStudent === '1' ? 2 : 0,
                                    borderBottomColor:'#c00c0c',
                                    width:'35%',
                                    alignItems:'center'
                                }}>
                                <Text style={{fontWeight:'bold',color:currentStudent === '1' ? '#000000' : '#6C6C6C',fontSize:16}}>Aluno</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{setCurrentStudent('2')}}
                                style={{
                                    borderBottomWidth:currentStudent === '2' ? 2 : 0,
                                    borderBottomColor:'#c00c0c',
                                    width:'35%',
                                    alignItems:'center'
                                }}>
                                <Text style={{fontWeight:'bold',color:currentStudent === '2' ? '#000000' : '#6C6C6C',fontSize:16}}>Responsável</Text>
                            </TouchableOpacity>
                        </View>
                        { currentStudent === '1' &&
                        <>
                            <View style={{
                                marginTop:45,
                                flexDirection:'row',
                                paddingHorizontal:20,
                            }}>
                                <View style={{width:'60%'}}>
                                    <Text style={{fontSize:12}}>RG:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.rg}</Text>
                                </View>

                                <View style={{width:'50%'}}>
                                    <Text style={{fontSize:12}}>CPF:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.cpf}</Text>
                                </View>
                            </View>

                            <View style={{
                                marginTop:30,
                                justifyContent:'space-between',
                                flexDirection:'row',
                                paddingHorizontal:20
                            }}>
                                <View style={{width:'60%'}}>
                                    <Text style={{fontSize:12}}>Tam. Roupa:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16,left:20}}>{alunoDetail.clothing}</Text>
                                </View>

                                <View style={{width:'50%'}}>
                                    <Text style={{fontSize:12}}>Tam. Sapato:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16,left:20}}>{alunoDetail.shoe}</Text>
                                </View>
                            </View>

                            <View style={{
                                marginTop:30,
                                paddingHorizontal:20
                            }}>
                                <View>
                                    <Text style={{fontSize:12}}>Escola:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.schoolName}</Text>
                                </View>
                            </View>

                            <View style={{
                                marginTop:30,
                                justifyContent:'space-between',
                                flexDirection:'row',
                                paddingHorizontal:20
                            }}>
                                <View>
                                    <Text style={{fontSize:12}}>Ano escolar:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16,textAlign:'center'}}>{alunoDetail.school}</Text>
                                </View>

                                <View style={{alignItems:'flex-end',right:30}}>
                                    <Text style={{fontSize:12}}>Cart. Vacinação:</Text>
                                    
                                    <View>
                                        <DropDownPicker
                                            open={vacinaOpen}
                                            value={vacinaValue}
                                            items={vacina}
                                            setOpen={setVacinaOpen}
                                            setValue={setVacinaValue}
                                            setItems={setVacina}
                                            placeholder="-"
                                            zIndex={1000}
                                            zIndexInverse={3000}
                                            style={{borderWidth:0,backgroundColor:'#F8FAFC',width:'45%',alignItems:'flex-start'}}
                                            dropDownContainerStyle={{borderWidth:0,backgroundColor:'#F8FAFC',width:'45%'}}
                                            textStyle={{fontWeight:'bold', fontSize:16}}
                                            theme="LIGHT"
                                        />
                                    </View>
                                </View>
                            </View>
                        </>
                        }
                        { currentStudent === '2' &&
                        <>
                            <View style={{
                                marginTop:45,
                                paddingHorizontal:20
                            }}>
                                <View>
                                    <Text style={{fontSize:12}}>Nome:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardian}</Text>
                                </View>
                            </View>

                            <View style={{
                                marginTop:30,
                                flexDirection:'row',
                                paddingHorizontal:20,
                            }}>
                                <View style={{width:'60%'}}>
                                    <Text style={{fontSize:12}}>CPF:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardianCpf}</Text>
                                </View>

                                <View style={{width:'50%'}}>
                                    <Text style={{fontSize:12}}>NIS:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardianNis}</Text>
                                </View>
                            </View>

                            <View style={{
                                marginTop:30,
                                flexDirection:'row',
                                paddingHorizontal:20,
                            }}>
                                <View style={{width:'60%'}}>
                                    <Text style={{fontSize:12}}>Celular:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardianCel}</Text>
                                </View>

                                <View style={{width:'50%'}}>
                                    <Text style={{fontSize:12}}>Renda Familiar:</Text>
                                    <Text style={{fontWeight:'bold',fontSize:16}}>R$ {alunoDetail.income},00</Text>
                                </View>
                            </View>
                        
                        </>
                        }
                    </View>
                }
             </View>
        </ModObs>
        </>
    )
}