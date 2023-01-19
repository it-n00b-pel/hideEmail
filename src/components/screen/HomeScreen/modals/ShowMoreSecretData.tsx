import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {removeSecretEmail, showSecretData} from '../../../../store/reducers/secretsEmailsReducer';
import SuperTextField from '../../../superComponents/SuperTextField';
import * as Clipboard from 'expo-clipboard';
import SuperButton from '../../../superComponents/SuperButton';
import {BlurView} from 'expo-blur';

type ShowMoreSecretDataPropsType = {
    id: number,
    view: React.ReactNode,
}

const ShowMoreSecretData: React.FC<ShowMoreSecretDataPropsType> = ({view, id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const secret = useAppSelector(state => state.secrets.currentSecret);
    const dispatch = useAppDispatch();

    const date = new Date(secret.created_at);
    const startDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

    const onPressHandler = (alias: string) => {
        Clipboard.setStringAsync(alias).then(() => {
            Alert.alert('Copy Pasta!', `Alias  ${alias}   was copied.`, [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        });
    };

    const destroySecretEmail = () => {
        dispatch(removeSecretEmail(secret.id)).then(() => setModalVisible(false));
    };

    useEffect(() => {
        modalVisible && dispatch(showSecretData(id));
    }, [modalVisible]);

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
                <BlurView intensity={100} tint={'dark'} style={[styles.blur]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.header}>
                                <Text style={[styles.title, {fontSize: 22, marginTop: 0}]}>{secret.alias}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.title]}>Ваш новый email:</Text>
                            <View style={styles.generatorEmail}>
                                <SuperTextField style={{width: '100%', marginTop: 10, height: 60}} focusable={false} editable={false} value={secret.alias}/>
                                <TouchableOpacity style={styles.copyEmail} onPress={() => onPressHandler(secret.alias)}>
                                    <MaterialIcons name="content-copy" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.title]}>Ваш мини комментарий:</Text>
                            {/*<SuperTextField style={{width: "100%", marginTop: 10, height: 60}} focusable={false} editable={false} value={secret.title}/>*/}
                            <TextInput style={{
                                marginTop: 12,
                                padding: 15,
                                minHeight:60,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 4,
                                fontSize: 22,
                                color: '#fff',
                                backgroundColor: '#30115e',
                            }} value={secret.title} multiline focusable={false} editable={false}/>
                            <Text style={[styles.title]}>Пересылаем на вот эту почту:</Text>
                            <SuperTextField style={{width: '100%', marginTop: 12, height: 60}} focusable={false} editable={false} value={secret.email}/>


                            <Text style={[styles.title, {fontSize: 16}]}>Дата создания: {startDate}</Text>
                            <Text style={[styles.title, {fontSize: 16}]}>Перенаправлено писем: {secret.redirect_count}</Text>

                            <SuperButton title={'Удалить этот адрес'} handlePress={destroySecretEmail}/>
                        </View>
                    </View>
                </BlurView>

            </Modal>

            <TouchableOpacity
                // style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                {view}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    blur: {
        height: '100%',
        // position: 'absolute',
        // width: '100%'
        //   position: 'absolute'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    modalView: {
        // height: 500,
        marginHorizontal: 10,
        backgroundColor: '#1A0933',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
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
    generatorEmail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
    },

    copyEmail: {
        marginTop: 10,
        backgroundColor: '#5e38a4',
        borderRadius: 3,
        height: 60,
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
    title: {
        fontSize: 12,
        color: '#44D9E8',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
        marginTop: 20,
    },

});

export default ShowMoreSecretData;