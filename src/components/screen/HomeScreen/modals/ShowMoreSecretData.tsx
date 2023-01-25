import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {removeSecretEmail, showSecretData} from '../../../../store/reducers/secretsEmailsReducer';
import SuperTextField from '../../../superComponents/SuperTextField';
import * as Clipboard from 'expo-clipboard';
import SuperButton from '../../../superComponents/SuperButton';
import {BlurView} from 'expo-blur';
import {blurValue, Colors} from '../../../../constants/Constants';

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

    const openModal = () => {
        dispatch(showSecretData(id)).then((res) => {
            // if res.payload !== undefined => request passed the norms and open this modal.
            // Else => error and will open ErrorModal
            // because Multiple Modals don't work
            if (res.payload !== undefined) {
                setModalVisible(true);
            }
        });
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // onRequestClose={() => {
                //     Alert.alert('Modal has been closed.');
                //     setModalVisible(!modalVisible);
                // }}
            >
                <BlurView intensity={blurValue} tint={'dark'} style={[styles.blur]}>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <View style={styles.header}>
                                <Text style={[styles.text, {fontSize: 22, marginTop: 0}]}>{secret.alias}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.text]}>Ваш новый email:</Text>
                            <View>
                                <SuperTextField style={{width: '100%', marginTop: 10, height: 60}} focusable={false} editable={false} value={secret.alias}/>
                                <TouchableOpacity style={styles.copyEmail} onPress={() => onPressHandler(secret.alias)}>
                                    <MaterialIcons name="content-copy" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.text]}>Ваш мини комментарий:</Text>
                            <TextInput style={{
                                marginTop: 12,
                                padding: 15,
                                minHeight: 60,
                                borderWidth: 1,
                                borderColor: Colors.White,
                                borderRadius: 4,
                                fontSize: 22,
                                color: Colors.White,
                                backgroundColor: Colors.Primary,
                            }} value={secret.title} multiline focusable={false} editable={false}/>

                            <Text style={[styles.text]}>Пересылаем на вот эту почту:</Text>
                            <SuperTextField style={{width: '100%', marginTop: 12, height: 60}} focusable={false} editable={false} value={secret.email}/>

                            <Text style={[styles.text, {fontSize: 16}]}>Дата создания: {startDate}</Text>
                            <Text style={[styles.text, {fontSize: 16, marginTop: 5, marginBottom: 12}]}>Перенаправлено писем: {secret.redirect_count}</Text>

                            <SuperButton title={'Удалить этот адрес'} handlePress={destroySecretEmail}/>
                        </View>
                    </View>
                </BlurView>

            </Modal>

            <TouchableOpacity
                onPress={openModal}>
                {view}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    blur: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    copyEmail: {
        marginTop: 10,
        backgroundColor: Colors.DimPrimary,
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
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    text: {
        fontSize: 12,
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
        marginTop: 20,
    },

});

export default ShowMoreSecretData;