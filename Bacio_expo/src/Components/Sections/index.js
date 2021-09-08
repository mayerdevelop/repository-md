import React from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';

import styles from './styles';
import typeIcons from '../../utils/typeIcons'

export default function Sections({onPress,nameSec,item}){

    return (

        <View style={styles.content}>
            { nameSec == 'Produtos' &&
                <TouchableOpacity style={styles.cardP} onPress={onPress}>
                    <Text style={styles.cardTitleP}>{item.codigo.substr(0,26)}</Text>
                    <Text style={styles.cardSubTitleP}>{item.descricao.substr(0,50)}</Text>
                </TouchableOpacity>
            }

            { nameSec == 'Lojas' &&
                <TouchableOpacity onPress={onPress} style={styles.cardL}>
                    <View style={styles.cardLCabec}>
                        <Image source={item.bloqueado==='2'?typeIcons[21]:typeIcons[22]} resizeMode='contain' />
                        <Text style={styles.cardTitleL}>{item.descricao.substr(0,23)}</Text>
                    </View>

                    <View style={styles.cardLItens}>
                        <View style={styles.cardLItensLeft}>
                            <Text style={styles.cardLText}>Filial: {item.filial}</Text>
                        </View>
                        <View style={styles.cardLItensRight}>
                            <Text style={[styles.cardLText,{marginHorizontal:10}]}>Inventário:</Text>
                            <Image source={item.invent==='S'?typeIcons[19]:typeIcons[20]} resizeMode='contain' />
                        </View>
                    </View>

                    <View style={styles.cardLItens}>
                        <View style={{marginHorizontal:10,alignItems:'center'}}>
                            <Text style={styles.cardLText}>Armazém: {item.armazem}</Text>
                        </View>

                        <View style={styles.cardLItensRight}>
                            <Text style={styles.cardLText}>Tipo Loja:</Text>
                            <Text style={{fontSize:20,color:'#FFA200',marginHorizontal:10}}>{item.tipolj}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
            }

        </View>
    )
}