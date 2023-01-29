import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'expo-blur';
import {blurValue} from '../../../../constants/Constants';
import {MaterialIcons} from '@expo/vector-icons';
import {EmailType} from '../../../../api/mailHideApi';
import {CenteredView, generalStyles, StyledHeader, StyledText, StyledTitle} from '../../../../styles/components';

type Props = {
    view: React.ReactNode,
    email: EmailType,
}

const MoreEmailData: React.FC<Props> = ({view, email}) => {
    const [modalVisible, setModalVisible] = useState(false);

    // const destroyEmail = () => {
    // };

    const endedDate = new Date(email.ended_at).getDate() + '-' + new Date(email.ended_at).getMonth() + 1 + '-' + new Date(email.ended_at).getFullYear();
    const createdDate = new Date(email.created_at).getDate() + '-' + new Date(email.created_at).getMonth() + 1 + '-' + new Date(email.created_at).getFullYear();
    const updateDate = new Date(email.updated_at).getDate() + '-' + new Date(email.updated_at).getMonth() + 1 + '-' + new Date(email.updated_at).getFullYear();

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
                                <StyledTitle fontSize={24}>Информация про Email</StyledTitle>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <MaterialIcons name="close" size={24} color="#fff"/>
                                </TouchableOpacity>
                            </StyledHeader>

                            {/*<View style={{marginBottom: 20}}>*/}
                            <StyledText fontSize={14} shadow>Адрес: {email.address}</StyledText>
                            <StyledText fontSize={14} shadow>Дата создания: {createdDate}</StyledText>
                            <StyledText fontSize={14} shadow>Дата обновления: {updateDate}</StyledText>
                            <StyledText fontSize={14} shadow>Дата окончания: {endedDate}</StyledText>
                            {/*</View>*/}

                            {/*<SuperButton title={'Удалить этот адрес'} handlePress={destroyEmail}/>*/}
                        </View>
                    </CenteredView>
                </BlurView>

            </Modal>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}>
                {view}
            </TouchableOpacity>
        </View>
    );
};

export default MoreEmailData;