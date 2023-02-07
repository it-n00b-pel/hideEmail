import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../store/store';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ShowMoreSecretData from './modals/ShowMoreSecretData';
import {Colors, width} from '../../../constants/Constants';
import {generalStyles, StyledBorderBlock, StyledInstruction, StyledText} from '../../../styles/components';

const SecretsList: React.FC = () => {
    const secretList = useAppSelector(state => state.secrets.secretsList);
    const isInstruction = useAppSelector(state => state.secrets.isInstruction);

    const copySecretEmail = (alias: string) => {
        Clipboard.setStringAsync(alias).then(() => {
            Alert.alert('Copy Pasta!', `Alias  ${alias}   was copied.`, [
                {text: 'Ok', style: 'cancel'}]);
        });
    };

    const emailList = secretList.map(email => {
        return <StyledBorderBlock key={email.id} style={[generalStyles.borderBlock, {justifyContent: 'space-between'}]} direction alignItems={'center'}>
            <ShowMoreSecretData id={email.id} view={
                <View style={{width: width - 90}}>
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

    const Instruction = <View>
        <StyledInstruction>
            <MaterialCommunityIcons name="arrow-up-left-bold" size={24} style={{padding: 5}} color={Colors.ShadowWhite}/>
            <StyledText fontSize={16} style={{padding: 5}} color={Colors.ShadowWhite}>Жми сюда, чтобы создать свой первый секретный емейл.</StyledText>
        </StyledInstruction>

        <StyledInstruction>
            <MaterialCommunityIcons name="arrow-left-bold-outline" size={28} style={{padding: 5}} color={Colors.ShadowWhite}/>
            <StyledText fontSize={16} color={Colors.ShadowWhite}>Там информация о твоем текущем тарифе, доступных тарифах, привязанных картах, email и другое...</StyledText>
        </StyledInstruction>

        <StyledInstruction>
            <StyledText fontSize={16} color={Colors.ShadowWhite}>
                А тут форма обратной связи.
                Дай знать, если возникли какие-то трудности, проблемы с приложением или просто пожелания.</StyledText>
            <MaterialCommunityIcons name="arrow-right-bold-outline" size={28} style={{paddingLeft: 5}} color={Colors.ShadowWhite}/>
        </StyledInstruction>
    </View>;

    return (
        <View>
            {emailList}
            {isInstruction && Instruction}
        </View>
    );
};

export default SecretsList;