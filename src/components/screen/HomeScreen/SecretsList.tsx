import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../store/store';
import {MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ShowMoreSecretData from './modals/ShowMoreSecretData';
import {Colors} from '../../../constants/Constants';

const SecretsList: React.FC = () => {
    const secretList = useAppSelector(state => state.secrets.secretsList);

    const copySecretEmail = (alias: string) => {
        Clipboard.setStringAsync(alias).then(() => {
            Alert.alert('Copy Pasta!', `Alias  ${alias}   was copied.`, [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        });
    };

    const emailList = secretList.map(email => {
        return <View key={email.id} style={styles.secretBlock}>
            <ShowMoreSecretData id={email.id} view={
                <View>
                    <Text style={styles.text}>{email.title ? email.title : email.alias}</Text>
                    <Text style={styles.secret}>{email.alias ? email.alias : ''}</Text>
                    <Text style={styles.email}>{email.email}</Text>
                </View>
            }/>
            <TouchableOpacity onPress={() => copySecretEmail(email.alias)}>
                <MaterialIcons name="content-copy" size={28} color="white"/>
            </TouchableOpacity>
        </View>;
    });

    return (
        <View>
            {emailList}
        </View>
    );
};

const styles = StyleSheet.create({
    secretBlock: {
        marginTop: 15,
        padding: 10,
        backgroundColor: Colors.Dark,
        shadowColor: Colors.White,
        borderWidth: 2,
        borderColor: Colors.Primary,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        color: Colors.White,
        fontWeight: '700',
    },
    secret: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: Colors.Lite,
    },
    email: {
        fontSize: 14,
        color: Colors.DimLite,
    },

});

export default SecretsList;