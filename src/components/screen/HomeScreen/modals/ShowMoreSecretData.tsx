import React, {useState} from 'react';
import {Alert, Modal, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {removeSecretEmail, showSecretData} from '../../../../store/reducers/secretsEmailsReducer';
import SuperTextField from '../../../superComponents/SuperTextField';
import * as Clipboard from 'expo-clipboard';
import SuperButton from '../../../superComponents/SuperButton';
import {BlurView} from 'expo-blur';
import {blurValue} from '../../../../constants/Constants';
import {CenteredView, generalStyles, StyledHeader, StyledSecretTitle, StyledText, StyledTitle} from '../../../../styles/components';

type ShowMoreSecretDataPropsType = {
    id: number,
    view: React.ReactNode,
}

const ShowMoreSecretData: React.FC<ShowMoreSecretDataPropsType> = ({view, id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const secret = useAppSelector(state => state.secrets.currentSecret);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.app.status) === 'loading';

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
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // onRequestClose={() => {
                //     Alert.alert('Modal has been closed.');
                //     setModalVisible(!modalVisible);
                // }}
            >
                <BlurView intensity={blurValue} tint={'dark'} style={{flex: 1}}>
                    <CenteredView>
                        <View style={generalStyles.modalView}>

                            <StyledHeader>
                                <StyledTitle fontSize={24}>Доп. информация</StyledTitle>
                                <TouchableOpacity disabled={isLoading} onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </StyledHeader>

                            <StyledTitle fontSize={14}>Ваш новый email:</StyledTitle>
                            <View style={{marginBottom: 20}}>
                                <SuperTextField style={{width: '100%', marginTop: 10, height: 60}} focusable={false} editable={false} value={secret.alias}/>
                                <TouchableOpacity style={generalStyles.copyEmail} onPress={() => onPressHandler(secret.alias)}>
                                    <MaterialIcons name="content-copy" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>

                            <StyledTitle fontSize={14}>Ваш мини комментарий:</StyledTitle>

                            <StyledSecretTitle>
                                <StyledText fontSize={22}>{secret.title}</StyledText>
                            </StyledSecretTitle>

                            <StyledTitle fontSize={14}>Пересылаем на вот эту почту:</StyledTitle>
                            <SuperTextField style={{width: '100%', marginTop: 12, height: 60, marginBottom: 20}} focusable={false} editable={false} value={secret.email}/>

                            <StyledTitle fontSize={16}>Дата создания: {startDate}</StyledTitle>
                            <StyledTitle fontSize={16}>Перенаправлено писем: {secret.redirect_count}</StyledTitle>

                            <SuperButton title={'Удалить этот адрес'} isBlockButton={isLoading} handlePress={destroySecretEmail}/>
                        </View>
                    </CenteredView>
                </BlurView>

            </Modal>

            <TouchableOpacity
                onPress={openModal}>
                {view}
            </TouchableOpacity>
        </View>
    );
};

export default ShowMoreSecretData;