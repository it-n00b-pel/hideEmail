import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';

const AddNewEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Создание секретного email</Text>

                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <MaterialIcons name="close" size={24} color="#fff"/>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.inputData}>

                            <View>
                                <Text style={[styles.title, {fontSize: 12, marginTop: 25}]}>Ваш новый email:</Text>
                                <View style={styles.generatorEmail}>
                                    <SuperTextField style={{width: '100%', marginTop: 10}} focusable={false} value={'wupton@maildddddhide.ru'}/>
                                    <TouchableOpacity style={styles.refreshEmail}>
                                        <MaterialIcons name="refresh" size={24} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <Text style={[styles.title, {fontSize: 12, marginTop: 25}]}>Ваш мини комментарий:</Text>
                            <SuperTextField style={{width: '100%', marginTop: 10}}/>

                            <Text style={[styles.title, {fontSize: 12, marginTop: 25}]}>Выберите куда пересылать:</Text>
                            <SuperTextField style={{width: '100%', marginTop: 10, marginBottom: 20}}/>

                        </View>
                        <SuperButton title={'Создать'}/>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={[styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Добавить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
    },
    modalView: {
        marginTop: 50,
        marginHorizontal: 10,
        backgroundColor: '#1A0933',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    title: {
        fontSize: 24,
        color: '#44D9E8',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

    inputData: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    generatorEmail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
    },

    refreshEmail: {
        marginTop: 10,
        backgroundColor: '#5e38a4',
        borderRadius: 3,
        height: 64,
        width: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#815fc0',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },

    buttonOpen: {
        width: 120,
        padding: 8,
        backgroundColor: 'rgba(111,66,193,.9)',
        shadowColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#815fc0',
        borderRadius: 5,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddNewEmail;