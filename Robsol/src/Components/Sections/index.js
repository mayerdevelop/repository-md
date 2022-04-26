import React, {useState} from 'react';
import {Text,View,TouchableOpacity,Image,FlatList,ActivityIndicator} from 'react-native';

import styles from './styles';
import typeIcons from '../../utils/typeIcons'

import ModPreview from '../../Modal/modPreview'
import ModSale from '../../Modal/modSale'

import api from '../../services/api'
import _ from 'underscore';

export default function Sections({nameSec,item,vendedor}){

    const [visiblePreview, setVisiblePreview] = useState(false);
    const [visibleSale, setVisibleSale] = useState(false);
    const [listSearch,setListSearch] = useState([]);
    const [qtdTotal, setQtdTotal] = useState('')
    const [vlrTotal, setVlrTotal] = useState('')
    const [load, setLoad] = useState(false)
    
    const authBasic = 'YWRtaW46QVZTSTIwMjI';

    const searchSec = async(codigo) =>{

        setLoad(true)
        setVisibleSale(true)
        setListSearch([])

        let params = {
            Authorization: 'Basic '+authBasic,
            VENDEDOR: vendedor,
            page: 1,
            pageSize: 1,
            codigo:codigo
        };

        let aResult = [];
        let qtd = 0;
        let vlr = 0;

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

        aResult.forEach((item) => {
            qtd += parseInt(item.quantidade)
            vlr += parseFloat(item.valor_total.trim().replace(',', '.'))
          })

        setQtdTotal(qtd)
        setVlrTotal(vlr)
        setLoad(false)
        setListSearch(aResult)
    };


    return (
        <View style={styles.content}>
            { nameSec == 'Products' && 
                <TouchableOpacity style={styles.cardP} onLongPress={() => { setVisiblePreview(true) }}>

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
                </TouchableOpacity>
            }

            { nameSec == 'Customers' &&
                <TouchableOpacity style={styles.cardP}>

                    <Text style={styles.cardDescP}>{item.nome_fantasia.trim()}</Text>
                    <Text style={styles.cardSubTitleP}>{item.razao_social.trim()}</Text>
                    <Text style={[styles.cardSubTitleP,{fontWeight:'bold'}]}>{item.cnpj.trim()}</Text>

                </TouchableOpacity>
            }

            { nameSec == 'Sales' &&
                <TouchableOpacity onPress={() => searchSec(item.codigo)} style={styles.cardP}>

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
        </View>
        
    )
}