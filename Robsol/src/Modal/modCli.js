import React, {useState,useEffect,useRef} from 'react';
import {View,Modal,Animated} from 'react-native';

import {StyleSheet} from 'react-native';

export default function ModCli({visibleCli, children}){

    const [showModal, setShowModal] = useState(visibleCli);
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let cancel = false;

        if (cancel) return; 

        toggleModal()

        return () => {cancel = true}
    }, [visibleCli]);

    const toggleModal = () => {

        if (visibleCli) {
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
}


const styles = StyleSheet.create({

    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalContainer: {
        width: '100%',
        height:'85%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
    
      
    });
    