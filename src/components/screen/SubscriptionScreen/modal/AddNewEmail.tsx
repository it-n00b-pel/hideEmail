import React, {useState} from 'react';
import {ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {BlurView} from 'expo-blur';
import {addNewEmail, fetchVerifyCode, setNewCode} from '../../../../store/reducers/subscriptionReducer';
import {Colors} from '../../../../constants/Constants';
import {generalStyles} from '../../../../styles/components';

const AddNewEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const isLoading = useAppSelector(state => state.app.status)==='loading'
    const isCode = useAppSelector(state => state.subscription.hasCode);
    const dispatch = useAppDispatch();
    const [isBlockButton, setBlockButton] = useState(true);
    const [email, setEmail] = useState('');
    const [code, setCodeFromEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState<null | string>(null);
    const [errorCode, setErrorCode] = useState<null | string>(null);

    const validateEmail = (email: string) => {
        setEmail(email);
        if (!email) {
            setBlockButton(true);
            setErrorEmail('Required');
        }
        if (email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setBlockButton(true);
            setErrorEmail('Invalid Email');
        } else {
            setBlockButton(false);
            setErrorEmail(null);
        }
    };

    const validateCode = (code: string) => {
        setCodeFromEmail(code);
        if (!code) {
            setBlockButton(true);
            setErrorCode('Required');
        }
        if (code.length > 0 && code.length < 6) {
            setBlockButton(true);
            setErrorCode('Must be 6 symbol');
        } else {
            setBlockButton(false);
            setErrorCode(null);
        }
    };

    const backTryAgain = () => {
        dispatch(setNewCode({hasCode: false}));
    };

    const closeModal = () => {
        setModalVisible(!modalVisible);
        setEmail('');
        setCodeFromEmail('');
        setErrorEmail(null);
        backTryAgain();
    };

    const addNewEmailAddress = () => {
        dispatch(addNewEmail({email, code: +code})).then((res) => {
            if (res.payload === undefined) {
                closeModal();
            }
        });
    };

    const sendCode = () => {
        dispatch(fetchVerifyCode(email));
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
                                                    autoFocus
                                                    errorText={errorEmail}
                                                    editable={!isCode}
                                                    onChangeText={text => validateEmail(text)}
                                    />
                                </View>
                            </View>

                            {isCode && <View>
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
                                {!isCode && <SuperButton title={'Отправить код'} isBlockButton={isBlockButton} handlePress={sendCode}/>}

                                {isCode && <SuperButton title={'Назад'} handlePress={() => {
                                    backTryAgain();
                                }}/>}

                                {isCode && <SuperButton title={'Добавить Email'} handlePress={() => {
                                    addNewEmailAddress();
                                }}/>}
                            </View>

                        </View>
                    </View>
                </BlurView>
            </Modal>
            <TouchableOpacity
                style={generalStyles.addButton}
                onPress={() => setModalVisible(true)}
            >
               <View>
                   <Text style={styles.textStyle}>Добавить</Text>
               </View>
                {isLoading && <ActivityIndicator animating={isLoading} color={Colors.Lite}/>}
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
        color: Colors.White,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonTextStyle: {
        color: Colors.White,
        textAlign: 'left',
        padding: 0,
    },
});

export default AddNewEmail;