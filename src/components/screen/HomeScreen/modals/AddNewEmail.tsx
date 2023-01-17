import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {addNewSecret, generateNewSecretEmail} from '../../../../store/reducers/secretsEmailsReducer';
import SelectDropdown from 'react-native-select-dropdown';

const AddNewEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();
    const secretEmail = useAppSelector(state => state.secrets.newEmail.secretEmail);
    const emails = useAppSelector(state => state.secrets.newEmail.emails);

    const [title, setTitle] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const emailsList: string[] = [];

    emails.map(e => emailsList.push(e.address));

    const generateSecretEmail = () => {
        dispatch(generateNewSecretEmail());
    };

    const addSecret = () => {
        dispatch(addNewSecret({
            secret_email: secretEmail,
            title: title ? title : secretEmail,
            email: currentEmail,
        })).then(() => {
            setModalVisible(false);
        });

    };

    useEffect(() => {
        if (emails[0]) {
            setCurrentEmail(emails[0].address);
        }
    }, [emails]);

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
                                    <SuperTextField style={{width: '100%', marginTop: 10}} focusable={false} value={secretEmail}/>
                                    <TouchableOpacity style={styles.refreshEmail} onPress={generateSecretEmail}>
                                        <MaterialIcons name="refresh" size={24} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <Text style={[styles.title, {fontSize: 12, marginTop: 25}]}>Ваш мини комментарий:</Text>
                            <SuperTextField style={{width: '100%', marginTop: 10}} value={title} onChangeText={setTitle}/>

                            <Text style={[styles.title, {fontSize: 12, marginTop: 25}]}>Выберите куда пересылать:</Text>
                            {/*<SuperTextField style={{width: '100%', marginTop: 10, marginBottom: 20}}/>*/}

                            <SelectDropdown
                                data={emailsList}
                                onSelect={(selectedItem) => {
                                    setCurrentEmail(selectedItem);
                                }}
                                defaultValue={emailsList[0]}
                                buttonTextStyle={styles.buttonTextStyle}
                                buttonStyle={styles.button}
                                buttonTextAfterSelection={(selectedItem) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    // setCurrentEmail(selectedItem);
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    setCurrentEmail(item);
                                    return item;
                                }}
                                onChangeSearchInputText={() => {
                                }}/>

                        </View>
                        <SuperButton title={'Создать'} handlePress={addSecret}/>
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
    button: {
        marginTop: 10,
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 22,
        color: '#fff',
        backgroundColor: '#30115e',
        borderColor: '#fff',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'left',
        padding: 0,
    },
});

export default AddNewEmail;