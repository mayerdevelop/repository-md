import React, {useRef, useState, useEffect} from "react";
import { 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Image
} 
from 'react-native'

import { FontAwesome,Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import Footer from "../../components/footer/footer";

import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker'

import api from '../../services/api';
import { Audio } from 'expo-av';

import CurrencyInput from 'react-native-currency-input';

import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';

import ModObs from '../../modal/modObs';

import img64 from '../../../assets/dragonmd'

function formatarCPF(cpf) {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatarTelefone(telefone) {
    return telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})?$/, '$1-$2');
}
  
export default function List(props){

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
    const [ageForm, setAgeForm] = useState('')
    const [incomeForm, setIncomeForm] = useState(0)
    const [image, setImage] = useState(null);
    
    const [form, setForm] = useState({
        name: '',
        age: '',
        core: '',
        status: '',
        birth: '',
        rg: '',
        cpf: '',
        clothing: 0,
        shoe: 0,
        school: '',
        schoolName: '',
        guardian: '',
        guardianCpf: '',
        guardianCel: '',
        guardianNis: '',
        vaccineCard: '',
        income: ''
    });

    const handleForm = (key, value) => {
    setForm((currentForm) => ({
        ...currentForm,
        [key]: value,
    }));
    };

    function formatarData(valor) {
    // Remove tudo que não for número
    let numero = valor.replace(/[^0-9]/g, '');

    // Separa a data em dia, mês e ano
    let dia = numero.substring(0, 2);
    let mes = numero.substring(2, 4);
    let ano = numero.substring(4, 8);

    // Formata a data no formato desejado
    let dataFormatada = '';
    if (dia) {
        dataFormatada += dia;
        if (dia.length === 2 && mes) {
        dataFormatada += `/${mes}`;
        if (mes.length === 2 && ano) {
            dataFormatada += `/${ano}`;
        }
        }
    }

    return dataFormatada;
    }

    function handleChangeDate(text) {

    handleForm('birth', formatarData(text))
    setAgeForm(idade({birth: formatarData(text)}))
    }


    function validarData(data) {
    // Verifica se a string possui 10 caracteres (dd/mm/yyyy)
    if (data.length !== 10) {
        return false;
    }
    
    // Extrai o dia, mês e ano da string
    const dia = Number(data.substring(0, 2));
    const mes = Number(data.substring(3, 5)) - 1; // Os meses começam em 0 (janeiro) na classe Date
    const ano = Number(data.substring(6, 10));
    
    // Cria uma nova data com os valores extraídos
    const novaData = new Date(ano, mes, dia);
    
    // Verifica se a data criada é igual à data passada como argumento
    // e se ela é uma data válida (ou seja, o mês e o dia são iguais aos valores informados)
    return novaData.getDate() === dia && novaData.getMonth() === mes && novaData.getFullYear() === ano;
    }

     const inputRef = useRef(null);
     const [, setCpf] = useState('');

     function handleChangeCPF(text,guardian) {
        const cpfSemMascara = text.replace(/\D/g, '');
        const cpfFormatado = formatarCPF(cpfSemMascara);

        setCpf(cpfFormatado);

        if(!!guardian){
            form.guardianCpf = cpfFormatado
        }else{
            form.cpf = cpfFormatado
        }
        
        inputRef.current.setNativeProps({ text: cpfFormatado });
    
        if (props.onChangeText) {
          props.onChangeText(cpfSemMascara);
        }
    }


    const inputRefTel = useRef(null);
    const [, setTelefone] = useState('');
  
    function handleChangeTel(text) {
      const telefoneSemMascara = text.replace(/\D/g, '');
      const telefoneFormatado = formatarTelefone(telefoneSemMascara);

      form.guardianCel = telefoneFormatado
      setTelefone(telefoneSemMascara);
  
      inputRefTel.current.setNativeProps({ text: telefoneFormatado });
  
      if (props.onChangeText) {
        props.onChangeText(telefoneSemMascara);
      }
    }

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
                            income: element.income,
                            avatar: element.avatar
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
            setScanned(false)
            setTextScan('')
        }

        setVisibleObs(true)
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
        setVacinaValue('1')
        setTextScan('')
        setScanned(false)
        setListId('')
        setAgeForm('')
        setCpf('')
        setTelefone('')
        setIncomeForm(0)
        setImage(null)
        setForm({
            name: '',
            age: '',
            core: '',
            status: '',
            birth: '',
            rg: '',
            cpf: '',
            clothing: 0,
            shoe: 0,
            school: '',
            schoolName: '',
            guardian: '',
            guardianCpf: '',
            guardianCel: '',
            guardianNis: '',
            vaccineCard: '',
            income: ''
          });

    }


    function idade(alunoDetail) {

        let retorno = 0

        if(!alunoDetail.id){
            alunoDetail.birth = alunoDetail.birth.substring(6,10)+alunoDetail.birth.substring(3,5)+alunoDetail.birth.substring(0,2)
        }

        if(alunoDetail.birth.length >= 8){

            var d = new Date,
                ano_atual = d.getFullYear(),
                mes_atual = d.getMonth() + 1,
                dia_atual = d.getDate(),
        
                ano_aniversario = +alunoDetail.birth.substring(0,4),
                mes_aniversario = +alunoDetail.birth.substring(4,6),
                dia_aniversario = +alunoDetail.birth.substring(6,8),
        
                quantos_anos = ano_atual - ano_aniversario;
        
            if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                quantos_anos--;
            }
            
            retorno = quantos_anos < 0 ? 0 : quantos_anos;
            alunoDetail.age = retorno.toString()

            if(!!alunoDetail.id){
                updateStudent(alunoDetail)
            }    
        }
        return retorno
    }

    
    async function updateStudent(updateStudent) {

        const objPost = {
			name: updateStudent.name,
			age: updateStudent.age,
			core: updateStudent.core,
			status: updateStudent.status,
			birth: updateStudent.birth,
			rg: updateStudent.rg,
			cpf: updateStudent.cpf,
			clothing: updateStudent.clothing,
			shoe: updateStudent.shoe,
			school: updateStudent.school,
			schoolName: updateStudent.schoolName,
			guardian: updateStudent.guardian,
			guardianCpf: updateStudent.guardianCpf,
			guardianCel: updateStudent.guardianCel,
			guardianNis: updateStudent.guardianNis,
			vaccineCard: updateStudent.vaccineCard,
			income: updateStudent.income,
            avatar: updateStudent.avatar
		}
    
        try{
            const response = await api.put(`/alunos/${updateStudent.id}`, objPost);
        
        } catch(error){
            console.log(error)
        }

    }


    async function createStudent(){

        console.log(form)

        if(!coreValue){
            alert('Necessário informar o núcleo')
            return
        }
        
        if(!form.income){
            form.income = '0'
        }

        if(!form.name){
            alert('Necessário informar o nome')
            return
        }

        if(!form.birth){
            alert('Necessário informar a data de nascimento')
            return
        }

        if(!validarData(form.birth)){
            alert('Data de nascimento inválida')
            return
        }

        try{
            const objPost = {
                name: form.name.toUpperCase(),
                age: idade(form).toString(),
                core: coreValue,
                status: "1",
                birth: form.birth,
                rg: form.rg,
                cpf: ((form.cpf.replace(".","")).replace(".","")).replace("-",""),
                clothing: form.clothing,
                shoe: form.shoe,
                school: form.school,
                schoolName: form.schoolName.toUpperCase(),
                guardian: form.guardian.toUpperCase(),
                guardianCpf: ((form.guardianCpf.replace(".","")).replace(".","")).replace("-",""),
                guardianCel: ((form.guardianCel.replace("(","")).replace(")","")).replace("-",""),
                guardianNis: form.guardianNis,
                vaccineCard: vacinaValue,
                income: parseFloat(form.income.trim().replace('.','').replace(',','.')),
                avatar: !image ? '' : image
            }

            const response = await api.post("/alunos", objPost);

            if (response.data.message === 'sucesso') {
                onClickCloseModal()
                getAlunos()
                
            } else {
                alert('erro ao criar cadastro, contate o administrador')
            } 
        
        } catch(error){
            console.log(error)
            alert('erro ao criar cadastro, contate o administrador')
        }
    }


    const shareStudent = async() =>{
        const file = await printToFileAsync({
            html: PDFHTML(alunoDetail),
            base64: true
        })

        const pdfName = `${file.uri.slice(0,file.uri.lastIndexOf('/') + 1) + ((alunoDetail.name).split(" ").join("_")).toLowerCase()}.pdf`

        await FileSystem.moveAsync({
            from: file.uri,
            to: pdfName,
        })

        await shareAsync(pdfName)
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 0.1,
        });
    
    
        if (!result.canceled) {
          setImage('data:image/jpg;base64,'+result.assets[0].base64);
        }
      };

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

                { current === 'students' &&
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 350 }
                        style={{
                            flex:1,
                            backgroundColor:'#F8FAFC',
                            width:'90%'
                        }}
                    >
                        <ScrollView>
                            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                                { !alunoDetail ?                         

                                    image ?
                                        <TouchableOpacity onPress={pickImage} >
                                            <Image 
                                                source={{ uri: image }} 
                                                style={{
                                                    borderRadius:100,
                                                    width:100,
                                                    height:100,
                                                    backgroundColor:'#ffffff',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    borderColor:'#c00c0c',
                                                    borderWidth:2,
                                                    marginBottom:7
                                                }}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={pickImage} 
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
                                        </TouchableOpacity>
            
                                    :
                                        !alunoDetail.avatar ?
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
                                        :
                                            <Image 
                                                source={{ uri: alunoDetail.avatar }} 
                                                style={{
                                                    borderRadius:100,
                                                    width:100,
                                                    height:100,
                                                    backgroundColor:'#ffffff',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    borderColor:'#c00c0c',
                                                    borderWidth:2,
                                                    marginBottom:7
                                                }}
                                            />
                                }
                                
                                <View style={{
                                    marginLeft:20,
                                    justifyContent:'space-between',
                                    flex:1
                                }}>

                                    <View>
                                        <Text>Nome:</Text>
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:14}}>{alunoDetail.name}</Text>
                                            : <TextInput style={{fontWeight:'bold',fontSize:14}} autoCorrect={false} onChangeText={(value) => handleForm('name', value)} value={form.name}/>
                                        }
                                    </View>

                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View>
                                            <Text>Idade:</Text>
                                            
                                            { !!alunoDetail
                                                ? <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{idade(alunoDetail)} anos</Text>
                                                : <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{ageForm} anos</Text>
                                            }
                                        </View>

                                        <View>
                                            <Text>Nascimento:</Text>
                                            
                                            { !!alunoDetail
                                                ?   <Text style={{fontWeight:'bold',fontSize:14,textAlign:'center'}}>{alunoDetail.birth.substring(6,8)+'/'+alunoDetail.birth.substring(4,6)+'/'+alunoDetail.birth.substring(0,4)}</Text>
                                                : <TextInput
                                                    value={form.birth}
                                                    onChangeText={handleChangeDate}
                                                    placeholder={'DD/MM/YYYY'}
                                                    keyboardType={'numeric'}
                                                    maxLength={10}
                                                />
                                            }
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
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.rg}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('rg', value)} value={form.rg} keyboardType="numeric"/>
                                        }
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Text style={{fontSize:12}}>CPF:</Text>
                                        
                                        { !!alunoDetail
                                            ?   
                                                <Text style={{fontSize:16, fontWeight:'bold'}}>{formatarCPF(alunoDetail.cpf)}</Text>

                                            :   
                                                <TextInput
                                                    {...props}
                                                    keyboardType="numeric"
                                                    maxLength={14}
                                                    onChangeText={(value) => {handleChangeCPF(value)}}
                                                    ref={inputRef}
                                                    value={form.cpf}
                                                />
                                        }
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
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16,left:20}}>{alunoDetail.clothing}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('clothing', parseInt(value))} keyboardType='numeric' maxLength={2} value={form.clothing.toString()}/>
                                        }
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Text style={{fontSize:12}}>Tam. Sapato:</Text>
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16,left:20}}>{alunoDetail.shoe}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('shoe', parseInt(value))} keyboardType='numeric' maxLength={2} value={form.shoe.toString()}/>
                                        }
                                    </View>
                                </View>

                                <View style={{
                                    marginTop:30,
                                    paddingHorizontal:20
                                }}>
                                    <View>
                                        <Text style={{fontSize:12}}>Escola:</Text>
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.schoolName}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('schoolName', value)} value={form.schoolName}/>
                                        }
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
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16,textAlign:'center'}}>{alunoDetail.school}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('school', value)} value={form.school}/>
                                        }
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
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardian}</Text>
                                            : <TextInput autoCorrect={false} onChangeText={(value) => handleForm('guardian', value)} value={form.guardian}/>
                                        }
                                    </View>
                                </View>

                                <View style={{
                                    marginTop:30,
                                    flexDirection:'row',
                                    paddingHorizontal:20,
                                }}>
                                    <View style={{width:'60%'}}>
                                        <Text style={{fontSize:12}}>CPF:</Text>
                                        
                                        { !!alunoDetail
                                            ?   
                                                <Text style={{fontSize:16, fontWeight:'bold'}}>{formatarCPF(alunoDetail.guardianCpf)}</Text>
                                            :  
                                                <TextInput
                                                    {...props}
                                                    keyboardType="numeric"
                                                    maxLength={14}
                                                    onChangeText={(value) => {handleChangeCPF(value,'guardian')}}
                                                    ref={inputRef}
                                                    value={form.guardianCpf}
                                                />
                                                
                                        }
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Text style={{fontSize:12}}>NIS:</Text>
                                        
                                        { !!alunoDetail
                                            ? <Text style={{fontWeight:'bold',fontSize:16}}>{alunoDetail.guardianNis}</Text>
                                            : <TextInput onChangeText={(value) => handleForm('guardianNis', value)} keyboardType="numeric" value={form.guardianNis}/>
                                        }
                                    </View>
                                </View>

                                <View style={{
                                    marginTop:30,
                                    flexDirection:'row',
                                    paddingHorizontal:20,
                                }}>
                                    <View style={{width:'60%'}}>
                                        <Text style={{fontSize:12}}>Celular:</Text>
                                        
                                        { !!alunoDetail
                                            ?   <Text style={{fontSize:16, fontWeight:'bold'}}>{formatarTelefone(alunoDetail.guardianCel)}</Text>
                                            :   
                                                <TextInput
                                                    {...props}
                                                    keyboardType="phone-pad"
                                                    maxLength={15}
                                                    onChangeText={(value) => {handleChangeTel(value)}}
                                                    ref={inputRefTel}
                                                    value={form.guardianCel}
                                                />
                                        }
                                    </View>

                                    <View style={{width:'50%'}}>
                                        <Text style={{fontSize:12}}>Renda Familiar:</Text>
    
                                        { !!alunoDetail
                                            ?   <Text style={{fontWeight:'bold',fontSize:16}}>R$ {parseFloat(alunoDetail.income)}</Text>
                                            :   <CurrencyInput
                                                    value={incomeForm}
                                                    onChangeText={(value) => handleForm('income', value)}
                                                    onChangeValue={setIncomeForm}
                                                    unit="R$"
                                                    delimiter="."
                                                    separator=","
                                                    precision={2}
                                                />
                                        }
                                    </View>
                                </View>
                            
                            </>
                            }


                            { !alunoDetail && currentStudent === '1' &&
                                <TouchableOpacity
                                    onPress={()=>{ currentStudent === '1' && createStudent() }}
                                    style={{
                                        backgroundColor:'#c00c0c',
                                        alignItems:'center',
                                        opacity:0.85,
                                        justifyContent:'center',
                                        marginTop:30,
                                        marginBottom:30,
                                        height:55,
                                        marginHorizontal:'25%',
                                        borderRadius:40,
                                        shadowColor: "#000",
                                        shadowOffset: {width: 0,height: 2},
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Salvar</Text>
                       
                                </TouchableOpacity>
                            }

                            { alunoDetail && currentStudent === '1' &&
                                <TouchableOpacity
                                    onPress={()=>{ currentStudent === '1' && shareStudent() }}
                                    style={{
                                        backgroundColor:'#c00c0c',
                                        alignItems:'center',
                                        opacity:0.85,
                                        justifyContent:'center',
                                        marginTop:30,
                                        marginBottom:30,
                                        height:55,
                                        marginHorizontal:'25%',
                                        borderRadius:40,
                                        shadowColor: "#000",
                                        shadowOffset: {width: 0,height: 2},
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{fontSize:22,fontWeight:'600',color:'white'}}>Compartilhar</Text>
                       
                                </TouchableOpacity>
                            }
                        
                        
                        </ScrollView>
                    </KeyboardAvoidingView>
                }
                
             </View>
        </ModObs>
        </>
    )

    function PDFHTML(alunoDetail){
        return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <style>
                html, body {
                    margin: 0;
                    padding: 20;
                    font-family: Arial, Helvetica, sans-serif;
                    flex: 1;
                }
                .arredondar {
                    display: inline-block;
                    background-color: #C00C0C;
                    padding: 2px;
                    font-size: 0;
                }
                .arredondar, .arredondar img {
                    max-width: 200;
                    -webkit-clip-path: circle(50% at 50% 50%);
                            clip-path: circle(50% at 50% 50%);
                }
                .avatar {
                    text-align: center;
                    margin-top: 40;
                    margin-bottom: 40;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: auto auto;
                    justify-content: space-between;
                    margin-left: 80; 
                    margin-right: 80;
                    text-align: center;
                }       
            </style>
            <body>
                <div style="z-index: -1; position: absolute; right: -50; bottom: 0;">
                    <img height="800" src="data:image/png;base64, ${img64}" />
                </div>
                <div style="height: 100%;">
                    <h2 style="margin-left: 80; margin-right: 80;"">${alunoDetail.core === '1' ? 'Padroeira' : 'Piratininga'}</h2>
                    <div class="avatar">
                        <div class="arredondar">
                            <img src="${alunoDetail.avatar}">
                        </div>
                        <div style="margin-right: 100; margin-left: 100">
                            <div style="margin-top: 40; font-size: 26; color: #C00C0C; font-weight: bold; text-align: left">${alunoDetail.name}</div>
                            <div style="margin-top: 4; font-size: 22; font-weight: 600; text-align: left;">${alunoDetail.age} anos</div>
                            <hr style="text-align:left;margin-left:0">
                        </div>
                    </div>
                    <div class="grid-container">
                        <div style="width:100%; opacity: 0.6; font-weight: 550;">Tamanho da Roupa:</div>
                        <div style="width:100%; opacity: 0.6; font-weight: 550;">Tamanho Calçado</div>
                        <div style="width:100%; font-size: 22; margin-top: 5; font-weight: bold;">${(alunoDetail.clothing).toString()}</div>
                        <div style="width:100%; font-size: 22; margin-top: 5; font-weight: bold;">${(alunoDetail.shoe).toString()}</div>
                    </div>
                    <div style="margin-top: 50;">
                        <div style="margin-left: 80; margin-right: 80; margin-bottom: 4; opacity: 0.6; font-weight: 550;">Escola:</div>
                        <div style="margin-left: 80; margin-right: 80; font-size: 22; margin-top: 5; font-weight: bold">${alunoDetail.schoolName}</div>
                    </div>
                    <div style="margin-top: 50;">
                        <div style="margin-left: 80; margin-right: 80; margin-bottom: 4; opacity: 0.6; font-weight: 550;">Ano escolar:</div>
                        <div style="margin-left: 80; margin-right: 80; font-size: 22; margin-top: 5; font-weight: bold">${alunoDetail.school}</div>
                    </div>
                </div>
            </body>
        </html>`
    }
}