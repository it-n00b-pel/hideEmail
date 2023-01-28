import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../store/store';
import {MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ShowMoreSecretData from './modals/ShowMoreSecretData';
import {Colors} from '../../../constants/Constants';
import {generalStyles, StyledBorderBlock, StyledText} from '../../../styles/components';

const SecretsList: React.FC = () => {
    const secretList = useAppSelector(state => state.secrets.secretsList);

    const copySecretEmail = (alias: string) => {
        Clipboard.setStringAsync(alias).then(() => {
            Alert.alert('Copy Pasta!', `Alias  ${alias}   was copied.`, [
                {text: 'Ok', style: 'cancel'}]);
        });
    };

    const emailList = secretList.map(email => {
        return <StyledBorderBlock key={email.id} style={generalStyles.borderBlock}>
            <ShowMoreSecretData id={email.id} view={
                <View>
                    <StyledText fontSize={18} fontWeight={600}>{email.title ? email.title : email.alias}</StyledText>
                    <StyledText fontSize={16} color={Colors.Lite} underline>{email.alias ? email.alias : ''}</StyledText>
                    <StyledText fontSize={14} color={Colors.DimLite}>{email.email}</StyledText>
                </View>
            }/>
            <TouchableOpacity onPress={() => copySecretEmail(email.alias)}>
                <MaterialIcons name="content-copy" size={28} color="white"/>
            </TouchableOpacity>
        </StyledBorderBlock>;
    });

    return (
        <View>
            {emailList}
        </View>
    );
};

export default SecretsList;