import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {addNewSecret, generateNewSecretEmail} from '../../../../store/reducers/secretsEmailsReducer';
import SelectDropdown from 'react-native-select-dropdown';
import {BlurView} from 'expo-blur';
import {blurValue, Colors} from '../../../../constants/Constants';

const AddNewSecretEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();
    const secretEmail = useAppSelector(state => state.secrets.newEmail.secretEmail);
    const emailsList = useAppSelector(state => state.secrets.newEmail.emails).map(e => e.address);

    const [title, setTitle] = useState('');
    const [currentEmail, setCurrentEmail] = useState(emailsList[0]);

    const generateSecretEmail = () => {
        dispatch(generateNewSecretEmail());
    };

    const createNewSecret = () => {
        dispatch(addNewSecret({
            secret_email: secretEmail, title: title ? title : secretEmail, email: currentEmail,
        }))
            .then(() => {
                setModalVisible(false);
                setTitle('');
            });
    };

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
                <BlurView intensity={blurValue} tint={'dark'} style={[styles.blur]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.header}>
                                <Text style={styles.text}>Создание секретного email</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </View>


                            <View>
                                <Text style={[styles.text, {fontSize: 12, marginTop: 25}]}>Ваш новый email:</Text>
                                <View style={styles.generatorEmail}>
                                    <SuperTextField style={{width: '100%', marginTop: 10, height: 60}} focusable={false} editable={false} value={secretEmail}/>
                                    <TouchableOpacity style={styles.refreshEmail} onPress={generateSecretEmail}>
                                        <MaterialIcons name="refresh" size={24} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={[styles.text, {fontSize: 12}]}>Ваш мини комментарий:</Text>
                            <TextInput style={{
                                marginTop: 12,
                                marginBottom: 25,
                                padding: 15,
                                borderWidth: 1,
                                borderColor: Colors.White,
                                borderRadius: 4,
                                fontSize: 22,
                                minHeight: 60,
                                color: Colors.White,
                                backgroundColor: Colors.Primary,
                            }} maxLength={100} multiline value={title} onChangeText={setTitle}/>

                            <Text style={[styles.text, {fontSize: 12}]}>Выберите куда пересылать:</Text>
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
                                    // console.log(selectedItem);
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    //  setCurrentEmail(item);
                                    return item;
                                }}
                                onChangeSearchInputText={() => {
                                }}/>
                            <SuperButton title={'Создать'} handlePress={createNewSecret}/>
                        </View>
                    </View>
                </BlurView>
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
        marginHorizontal: 10,
        backgroundColor: Colors.Dark,
        borderRadius: 20,
        padding: 20,
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    blur: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
    },
    generatorEmail: {
        marginBottom: 25,
    },
    refreshEmail: {
        marginTop: 10,
        backgroundColor: Colors.Primary,
        borderRadius: 3,
        height: 60,
        width: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.White,
        borderWidth: 1,
        borderColor: Colors.LightPrimary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonOpen: {
        width: 120,
        padding: 8,
        backgroundColor: Colors.Primary,
        shadowColor: Colors.White,
        borderWidth: 2,
        borderColor: Colors.LightPrimary,
        borderRadius: 5,
        alignItems: 'center',
        shadowOffset: {
            width: 1,
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
        color: Colors.White,
        backgroundColor: Colors.Primary,
        borderColor: Colors.White,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: Colors.White,
        textAlign: 'left',
        padding: 0,
    },
});

export default AddNewSecretEmail;