import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'expo-blur';
import {blurValue, Colors} from '../../../../constants/Constants';
import {MaterialIcons} from '@expo/vector-icons';
import SuperButton from '../../../superComponents/SuperButton';
import {EmailType} from '../../../../api/mailHideApi';

type Props = {
    view: React.ReactNode,
    email: EmailType,
}

const MoreEmailData: React.FC<Props> = ({view, email}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const destroyEmail = () => {

    };

    const endedDate = new Date(email.ended_at).getDate() + '-' + new Date(email.ended_at).getMonth() + 1 + '-' + new Date(email.ended_at).getFullYear();
    const createdDate = new Date(email.created_at).getDate() + '-' + new Date(email.created_at).getMonth() + 1 + '-' + new Date(email.created_at).getFullYear();
    const updateDate = new Date(email.updated_at).getDate() + '-' + new Date(email.updated_at).getMonth() + 1 + '-' + new Date(email.updated_at).getFullYear();

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
                                <Text style={[styles.text, {fontSize: 22, marginTop: 0}]}>Информация про Email</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.text, {fontSize: 14}]}>Адрес: {email.address}</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>Дата создания: {createdDate}</Text>
                            <Text style={[styles.text, {fontSize: 14}]}>Дата обновления: {updateDate}</Text>
                            <Text style={[styles.text, {fontSize: 14, marginBottom: 20}]}>Дата окончания: {endedDate}</Text>

                            <SuperButton title={'Удалить этот адрес'} handlePress={destroyEmail}/>
                        </View>
                    </View>
                </BlurView>

            </Modal>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}>
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

export default MoreEmailData;