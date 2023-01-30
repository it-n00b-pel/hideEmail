import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import SuperTextField from '../../../superComponents/SuperTextField';
import SuperButton from '../../../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {addNewSecret, generateNewSecretEmail} from '../../../../store/reducers/secretsEmailsReducer';
import SelectDropdown from 'react-native-select-dropdown';
import {BlurView} from 'expo-blur';
import {blurValue, Colors} from '../../../../constants/Constants';
import {CenteredView, generalStyles, StyledHeader, StyledText, StyledTitle} from '../../../../styles/components';

const AddNewSecretEmail: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();
    const secretEmail = useAppSelector(state => state.secrets.newEmail.secretEmail);
    const emailsList = useAppSelector(state => state.secrets.emails).map(e => e.address);

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
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <BlurView intensity={blurValue} tint={'dark'} style={{flex: 1}}>
                    <CenteredView>
                        <View style={generalStyles.modalView}>
                            <StyledHeader>
                                <StyledTitle>Создание секретного email</StyledTitle>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </StyledHeader>

                            <View style={{marginBottom: 20}}>
                                <StyledTitle fontSize={16}>Ваш новый email:</StyledTitle>
                                <SuperTextField style={{width: '100%', marginTop: 10, height: 60}} focusable={false} editable={false} value={secretEmail}/>
                                <TouchableOpacity style={generalStyles.refreshEmail} onPress={generateSecretEmail}>
                                    <MaterialIcons name="refresh" size={24} color="white"/>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginBottom: 20}}>
                                <StyledTitle fontSize={16}>Ваш мини комментарий:</StyledTitle>
                                <TextInput style={{
                                    marginTop: 12,
                                    padding: 15,
                                    borderWidth: 1,
                                    borderColor: Colors.White,
                                    borderRadius: 4,
                                    fontSize: 22,
                                    minHeight: 60,
                                    color: Colors.White,
                                    backgroundColor: Colors.Primary,
                                }} maxLength={100} multiline value={title} onChangeText={setTitle}/>
                            </View>

                            <StyledTitle fontSize={16}>Выберите куда пересылать:</StyledTitle>

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
                    </CenteredView>
                </BlurView>
            </Modal>
            <TouchableOpacity
                style={generalStyles.addButton}
                onPress={() => setModalVisible(true)}>
                <StyledText fontSize={18} fontWeight={600}>Добавить</StyledText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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