import React, {useState,useContext} from 'react';
import {Text,View,TouchableOpacity,Image,FlatList,ActivityIndicator,TextInput,ScrollView,KeyboardAvoidingView,Platform,SafeAreaView} from 'react-native';

import styles from './styles';
import typeIcons from '../../utils/typeIcons'

import ModPreview from '../../Modal/modPreview'
import ModSale from '../../Modal/modSale'
import ModCli from '../../Modal/modCli'
import ModPrd from '../../Modal/modPrd'

import api from '../../services/api'
import _ from 'underscore';

import { useForm, Controller } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {CartContext} from '../../Contexts/cart'

import { useNavigation } from '@react-navigation/native';


export default function Sections({nameSec,item,vendedor,dataBack,prdProd}){

    const navigation = useNavigation();

    const authBasic = 'YWRtaW46QVZTSTIwMjI';

    const [visiblePreview, setVisiblePreview] = useState(false);
    const [visibleSale, setVisibleSale] = useState(false);
    const [visibleCli, setVisibleCli] = useState(false);

    const [listSearch,setListSearch] = useState([]);
    const [qtdTotal, setQtdTotal] = useState('')
    const [vlrTotal, setVlrTotal] = useState('')
    const [load, setLoad] = useState(false)
    const [loadPrd, setLoadPrd] = useState(false)

    const DinamicTouch = prdProd?View:TouchableOpacity
    const DinamicTouchButton = prdProd?TouchableOpacity:View

    const { addCart,cart,visibleCart,visiblePrd,totalCart,vlrTotalCart} = useContext(CartContext)


    const {control,handleSubmit,formState:{errors},reset} = useForm({ 
        resolver: yupResolver(
            yup.object({
                contato: yup.string().required("Informe o Contato..."),
                razao_social: yup.string().required("Informe a Razão Social..."),
                nome_fantasia: yup.string().required("Informe o Nome Fantasia..."),
                email: yup.string().email('E-mail invalido').required("Informe o Email..."),
                celular: yup.string().required("Informe o Telefone..."),
                cep: yup.string().required("Informe o CEP..."),
                endereco: yup.string().required("Informe o Endereço..."),
                bairro: yup.string().required("Informe o Bairro..."),
                cidade: yup.string().required("Informe a Cidade..."),
                uf: yup.string().required("Informe a UF..."),
            })
        )
    });


    const searchSec = async(option) =>{

        setLoad(true)
        setListSearch([])

        let params = {
            Authorization: 'Basic '+authBasic,
            VENDEDOR: vendedor,
            page: 1,
            pageSize: 1,
        };

        let opt_new = option.split(":");
        
        switch (opt_new[2]) {
            case "cli":
                params.cnpj = opt_new[1];
                setVisibleCli(true)
                break;
            case "ped":
                params.codigo = opt_new[1];
                setVisibleSale(true)
                break;
            case "prd":
                params.codigo = opt_new[1];
                visibleCart(true)
                break;
            default:
                break;
        }

        let aResult = [];

        try{
            const response = await api.get(`/${nameSec}/`,{headers: params})
            if(_.has(response.data,"Erro")){
                aResult = [];
            }else {
                if(response.data.items){
                    response.data["items"].forEach((element, index) => {
                      aResult.push({index: index, ...element});
                    });
                  }else {
                    aResult.push(response.data);
                }
            }
            
        }catch(error){
            alert(error)
        }

        reset(aResult[0]);

        if(opt_new[2] == 'ped'){
            let qtd = 0;
            let vlr = 0;
    
            aResult.forEach((item) => {
                qtd += parseInt(item.quantidade)
                vlr += parseFloat(item.valor_total.trim().replace(',', '.'))
            })
    
            setQtdTotal(qtd)
            setVlrTotal(vlr)
        };

        setLoad(false)
        setListSearch(aResult)
        
    }


    const handleSignIn = async(data) =>{

        setLoadPrd(true)

        const response = await api.get(`/Products/`,{
            withCredentials: true,
            headers: {
                'Authorization': 'Basic '+authBasic,
                'VENDEDOR': dataBack[2].cod_vendedor,
                'page': 1,
                'pageSize': 10
            } 
        })

        navigation.navigate('SalePrd',{
            nameSec:'Products',
            data:response.data["items"],
            dataUser:dataBack[2],
            filter:'CODIGO',
            dataBack: dataBack,
            prdProd:true
        })

        setLoadPrd(false)
        setVisibleCli(false)
    }


    function addProductToCart(item,initial){

        if(initial){visibleCart(true)}
        
        let vlrTotal = 0

        const copyCart = [...cart];
        const result = copyCart.find((product) => product.id === parseInt(item.id));

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
            
            const sumall =  vlrTotalCart + parseInt(item.preco)
            totalCart(sumall)

        }else {
            copyCart.forEach((list) => { 
                if(list.id === item.id){
                    vlrTotal += parseFloat(list.VALOR.replace(',', '.')) 
                }
            });

            result.QUANTIDADE = result.QUANTIDADE + 1;

            if(vlrTotal !== 0){
                result.TOTAL = vlrTotal * result.QUANTIDADE;
            } else{
                result.TOTAL = parseFloat(result.VALOR.replace(',', '.')) * result.QUANTIDADE;
            }

            const sumall = copyCart.map(item => item.TOTAL).reduce((prev, curr) => prev + curr, 0);
            
            totalCart(sumall)
        };

        addCart(copyCart)

    };


    function removeProductToCart(item){

        let vlrTotal = 0

        const copyCart = [...cart];
        const result = copyCart.find((product) => product.id === parseInt(item.id));

        if(result && result.QUANTIDADE > 1){
            result.QUANTIDADE = result.QUANTIDADE - 1
            addCart(copyCart)

        }else {
            const arrayFilter = copyCart.filter(product => product.id !== item.id);
            addCart(arrayFilter)
        }

        if(result && result.QUANTIDADE >= 1){
            copyCart.forEach((list) => { 
                if(list.id === item.id){
                    vlrTotal += parseFloat(list.VALOR.replace(',', '.')) 
                }
            });

            result.TOTAL = vlrTotal * result.QUANTIDADE;
            const totalSub = vlrTotalCart - parseFloat(result.VALOR)

            totalCart(totalSub)
        }

    };

    function clearCart(){
        addCart([])
        totalCart(0)
        visibleCart(false)
    };

    return (
        <SafeAreaView style={styles.content}>
            { nameSec == 'Products' && 
                <DinamicTouch style={styles.cardP} onLongPress={() => { setVisiblePreview(true) }}>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.cardTitleP}>{item.codigo.trim()}</Text>
                        <Image 
                            style={styles.genero}
                            source={item.genero.trim()==='Masculino'?typeIcons[30]:typeIcons[31]} 
                        />
                    </View>

                    <Text style={styles.cardDescP}>{item.descricao.trim().substr(0,35)}</Text>

                    
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                            <Text style={styles.cardSubTitleP}>{'R$ '+item.preco.trim()}</Text>
                            <Text style={styles.cardSubTitleP}>{'Saldo '+item.saldo.trim()}</Text>
                            <Text style={styles.cardSubTitleP}>{'Linha: '+item.linha.trim()}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardSubTitleP}>{'Marca: '+item.marca.trim()}</Text>
                            <Text style={styles.cardSubTitleP}>{'Material: '+item.material.trim()}</Text>
                        </View>
                    </View>

                    { prdProd &&
                        <DinamicTouchButton 
                            style={styles.buttonAddInitial} 
                            onPress={()=>{addProductToCart(item, true)}}
                        >
                            <Text style={styles.txtAddInitial}>Adicionar +</Text>
                        </DinamicTouchButton>
                    }
                </DinamicTouch>
            }

            { nameSec == 'Customers' &&
                <TouchableOpacity onPress={()=>{searchSec(`cnpj:${item.cnpj}:cli`)}} style={styles.cardP}>

                    <Text style={styles.cardDescP}>{item.nome_fantasia.trim()}</Text>
                    <Text style={styles.cardSubTitleP}>{item.razao_social.trim()}</Text>
                    <Text style={[styles.cardSubTitleP,{fontWeight:'bold'}]}>{item.cnpj.trim()}</Text>

                </TouchableOpacity>
            }

            { nameSec == 'Sales' &&
                <TouchableOpacity onPress={() => searchSec(`CODIGO:${item.codigo}:ped`)} style={styles.cardP}>

                    <Text style={styles.cardDescP}>{'Código: '+item.codigo.trim()}</Text>
                    <Text style={styles.cardSubTitleP}>{'Cliente: '+item.cliente.trim()}</Text>
                    <Text style={styles.cardSubTitleP}>{'Emissão: '+item.emissao.trim()}</Text>
                    <Text style={styles.cardSubTitleP}>{'Status: '+item.status.trim()}</Text>

                    { (!!item.nota.trim()) ?
                        <Text style={styles.cardSubTitleP}>{'Nota: '+item.nota.trim()+' / Série: '+item.serie.trim()}</Text>
                        :
                        <Text style={styles.cardSubTitleP}>{'Nota: Não possui'}</Text>
                    }
                </TouchableOpacity>
            }

            <ModPreview visiblePreview={visiblePreview}>
                <View style={styles.closeModal}>
                    <TouchableOpacity onPress={() => setVisiblePreview(false)}>
                        <Image
                            source={typeIcons[32]}
                            style={{height: 30, width: 30}}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Image
                        source={{uri: item.imagem}}
                        style={styles.imgPreview}
                    />
                </View>

                <Text style={styles.txtPreview}>Image Preview</Text>
            </ModPreview>

            <ModSale visibleSale={visibleSale}>
                <View style={styles.headerPed}>
                    <Text style={{fontSize:22, fontWeight:'bold'}}>Itens do pedido</Text>
                    <View style={styles.closeModal}>
                        <TouchableOpacity onPress={() => setVisibleSale(false)}>
                            <Image
                                source={typeIcons[32]}
                                style={{height: 25, width: 25}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={listSearch.sort((a, b) => a.id.localeCompare(b.id))}
                    renderItem={({item})=> 
                        <View style={styles.contDetPed}>
                            <Text style={styles.txtBold}>{item.codigo.trim()}</Text>
                            <Text>{item.descricao.trim()}</Text>
        
                            <View style={styles.cabecDet}>
                                <Text>Quant.</Text>
                                <Text>Valor Unitario</Text>
                                <Text>Valor total</Text>
                            </View>

                            <View style={styles.itensDet}>
                                <Text style={{left:14}}>{item.quantidade.trim()}</Text>
                                <Text style={{left:8}}>{'R$'+item.valor_unit.trim()}</Text>
                                <Text>{'R$'+item.valor_total.trim()}</Text>
                            </View>
                        </View>
                    }
                    onEndReached={null}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={ load ? 
                        <ActivityIndicator color={'#000000'} size={50}/>
                        :
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Registro não encontrado</Text>
                        </View>
                    }
                />

                <View style={styles.totalPed}>
                    <Text style={styles.txtBold}>{'Quant.: '+qtdTotal}</Text>
                    <Text style={styles.txtBold}>{'Total: '+vlrTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                </View>
                
            </ModSale>

            <ModCli visibleCli={visibleCli}>
                <View style={styles.headerPed}>
                    <Text style={{fontSize:22, fontWeight:'bold'}}>Atualizar Cadastro</Text>
                    <View style={styles.closeModal}>
                        <TouchableOpacity onPress={() => setVisibleCli(false)}>
                            <Image
                                source={typeIcons[32]}
                                style={{height: 25, width: 25}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                    
                <KeyboardAvoidingView style={{marginBottom:70}}
                    behavior={Platform.OS == 'IOS' ? 'padding' : 'height'}
                    keyboardVerticalOffset={200}
                >
                    <ScrollView >
                        <Controller
                            control={control}
                            name='cnpj'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>CNPJ *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.cnpj ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8',color:'#B2ADAD'}]}
                                        placeholder={errors.cnpj && errors.cnpj?.message}
                                        placeholderTextColor='#FA7E7E'
                                        editable={false}
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='insc_estadual'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Inscrição Estadual *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.insc_estadual ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8',color:'#B2ADAD'}]}
                                        placeholder={errors.insc_estadual && errors.insc_estadual?.message}
                                        placeholderTextColor='#FA7E7E'
                                        editable={false}
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='filial'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Filial *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.filial ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8',color:'#B2ADAD'}]}
                                        placeholder={errors.filial && errors.filial?.message}
                                        placeholderTextColor='#FA7E7E'
                                        editable={false}
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='contato'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Contato *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.contato ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.contato && errors.contato?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='razao_social'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Razão Social *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.razao_social ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.razao_social && errors.razao_social?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='nome_fantasia'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Nome Fantasia *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.nome_fantasia ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.nome_fantasia && errors.nome_fantasia?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='email'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>E-mail *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.email ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.email && errors.email?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />
                        
                        <Controller
                            control={control}
                            name='celular'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Telefone Contato *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.celular ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.celular && errors.celular?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='cep'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>CEP *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.cep ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.cep && errors.cep?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='endereco'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Endereço *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.endereco ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.endereco && errors.endereco?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />
                        
                        <Controller
                            control={control}
                            name='bairro'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Bairro *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.bairro ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.bairro && errors.bairro?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='cidade'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>Cidade *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.cidade ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.cidade && errors.cidade?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name='uf'
                            render={({field: {onChange,onBlur,value}})=>(
                                <View>
                                    <Text style={{color:'#AAADAE',fontWeight:'bold'}}>UF *</Text>
                                    <TextInput
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}
                                        style={[styles.input, errors.uf ? { borderColor:'#D13434' } : { borderColor:'#2F8BD8'}]}
                                        placeholder={errors.uf && errors.uf?.message}
                                        placeholderTextColor='#FA7E7E'
                                    />
                                </View>
                            )}
                        />

                        <TouchableOpacity style={styles.submitAtualizar} onPress={handleSubmit(handleSignIn)}>
                            { loadPrd ?
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <ActivityIndicator color={'#fff'} size={35}/>
                                </View>
                                :
                                <Text style={styles.submitTxtAtualizar}>Atualizar</Text>
                            }
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
                
            </ModCli>
            
            <ModPrd visiblePrd={visiblePrd}>
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                    <View>
                        <Text style={{fontSize:22, fontWeight:'bold'}}>Adicionar Produto</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => visibleCart(false)} style={{bottom:25}}>
                            <Text style={{fontSize:50}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <FlatList
                    data={cart}
                    renderItem={({item})=> 
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginHorizontal:10,
                            marginBottom:30,
                            alignItems:'center'
                        }}>
                            <View>
                                <Text style={styles.txtBold}>{item.PRODUTO.trim()}</Text>
                                <Text >{item.DESCRICAO.trim().substr(0,19)}</Text>
                                <Text >{item.VALOR.trim()}</Text>
                            </View>


                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text>{item.TOTAL.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                                    <TouchableOpacity onPress={()=>{removeProductToCart(item)}} style={styles.buttonQty}>
                                        <Text style={styles.txtButtonQty}>-</Text>
                                    </TouchableOpacity>

                                    <Text style={{fontSize:18,fontWeight:'bold',marginHorizontal:5}}>
                                        {item.QUANTIDADE}
                                    </Text>

                                    <TouchableOpacity onPress={()=>{addProductToCart(item, false)}} style={styles.buttonQty}>
                                        <Text style={styles.txtButtonQty}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> 

                        </View>
                    }
                    onEndReached={null}
                    onEndReachedThreshold={0.1}
                    keyExtractor={(item, index) => String(index)}
                    ListEmptyComponent={ load ? 
                        <ActivityIndicator color={'#000000'} size={50}/>
                        :
                        <TouchableOpacity onPress={()=>{visibleCart(false)}} style={{alignItems:'center',marginTop:50}}>
                            <Text style={{fontSize:22,color:'#49BB17',fontWeight:'bold'}}>Adicionar Itens ao Carrinho</Text>
                        </TouchableOpacity>
                    }
                />

                <View style={{marginBottom:25}}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginBottom:10
                    }}>

                        <Text style={{fontWeight:'bold'}}>Quant. Total: </Text>
                        <Text>{'0'}</Text>
                    </View>

                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginBottom:10
                    }}>

                        <Text style={{fontWeight:'bold'}}>Total Pedido: </Text>
                        <Text>{vlrTotalCart.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                    </View>
                </View>
                
                {cart.length !== 0 &&
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <TouchableOpacity 
                            onPress={()=>{clearCart()}}
                            style={{
                                flex:1,
                                flexDirection:'row',
                                height:40,
                                alignItems:'center',
                                borderWidth:3,
                                borderColor:'#2F8BD8',
                                borderRadius:10,
                            }}
                        >   
                            <Image 
                                style={{resizeMode:'contain', width:20,marginHorizontal:10}}
                                source={typeIcons[37]}
                            />
                            <Text style={{color:'#2F8BD8', fontWeight:'bold', fontSize:16}}>Limpar</Text>
                        </TouchableOpacity>
                        

                        <TouchableOpacity 
                            onPress={()=>{clearCart()}}
                            style={{
                                flex:2,
                                height:40,
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#222020',
                                borderRadius:10,
                                marginLeft:10
                            }}
                        >
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ModPrd>

        </SafeAreaView>
        
    )
}