import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {BlurView} from 'expo-blur';
import {addNewEmail, fetchVerifyCode, setNewCode} from '../../../../store/reducers/subscriptionReducer';

const AddNewEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const isCode = useAppSelector(state => state.subscription.hasCode);
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [code, setCodeFromEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState<null | string>(null);
    const [errorCode, setErrorCode] = useState<null | string>(null);

    const validateEmail = (email: string) => {
        setEmail(email);
        if (!email) {
            setErrorEmail('Required');
        }
        if (email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrorEmail('Invalid Email');
        } else setErrorEmail(null);
    };

    const validateCode = (code: string) => {
        setCodeFromEmail(code);
        if (!code) {
            setErrorCode('Required');
        }
        if (code.length > 0 && code.length < 6) {
            setErrorCode('Must be 6 symbol');
        } else setErrorCode(null);
    };

    const backTryAgain = () => {
        dispatch(setNewCode({hasCode: false}));
    };

    const closeModal = () => {
        setModalVisible(!modalVisible);
        setEmail('');
        setErrorEmail(null);
        backTryAgain();
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
                <BlurView intensity={50} tint={'dark'} style={[styles.blur]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.header}>
                                <Text style={styles.text}>Добавление нового email</Text>
                                <TouchableOpacity onPress={() => closeModal()}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={[styles.text, {fontSize: 12, marginTop: 20}]}>Ваш новый email:</Text>
                                <View>
                                    <SuperTextField style={{width: '100%', marginTop: 10, height: 60}}
                                                    value={email}
                                                    errorText={errorEmail}
                                                    onChangeText={text => validateEmail(text)}
                                    />
                                </View>
                            </View>

                            {!isCode && <View>
                                <Text style={[styles.text, {fontSize: 12, marginTop: 10}]}>Код</Text>
                                <View>
                                    <SuperTextField style={{width: '100%', marginTop: 10, height: 60}}
                                                    value={code}
                                                    keyboardType={'numeric'}
                                                    errorText={errorCode}
                                                    onChangeText={text => validateCode(text)}
                                    />
                                </View>
                            </View>
                            }

                            <View style={{marginTop: 20}}>
                                {isCode && <SuperButton title={'Назад'} handlePress={() => {
                                    backTryAgain();
                                }}/>}

                                {!isCode && <SuperButton title={'Отправить код'} handlePress={() => {
                                    dispatch(fetchVerifyCode(email));
                                }}/>}

                                {isCode && <SuperButton title={'Добавить Email'} handlePress={() => {
                                    dispatch(addNewEmail({email, code: +code}));
                                }}/>}
                            </View>

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
        backgroundColor: '#1A0933',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#ffffff',
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
        color: '#44D9E8',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 3,
    },
    refreshEmail: {
        marginTop: 10,
        backgroundColor: '#5e38a4',
        borderRadius: 3,
        height: 60,
        width: 40,
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#815fc0',
        shadowOffset: {
            width: 1,
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
        color: '#fff',
        backgroundColor: '#30115e',
        borderColor: '#fff',
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'left',
        padding: 0,
    },
});

export default AddNewEmail;