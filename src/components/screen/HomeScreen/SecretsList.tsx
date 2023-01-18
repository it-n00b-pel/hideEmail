import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../../store/store';
import {width} from '../../../constants/Constants';
import {MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ShowMoreSecretData from './modals/ShowMoreSecretData';

const SecretsList: React.FC = () => {
    const secretList = useAppSelector(state => state.secrets.secretsList);

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

    const emailList = secretList.map(email => {
        return <View key={email.id} style={styles.secretBlock}>
            <ShowMoreSecretData id={email.id} view={
                <View style={styles.secretData}>
                    <Text style={styles.title}>{email.title ? email.title : email.alias}</Text>
                    <Text style={styles.secret}>{email.alias ? email.alias : ''}</Text>
                    <Text style={styles.email}>{email.email}</Text>
                </View>
            }/>
            <TouchableOpacity onPress={() => onPressHandler(email.alias)}>
                <MaterialIcons name="content-copy" size={28} color="white"/>
            </TouchableOpacity>
        </View>;
    });

    return (
        <View style={styles.container}>
            {emailList}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    secretBlock: {
        marginTop: 15,
        padding: 10,
        width: width - 40,
        backgroundColor: '#1A0933',
        shadowColor: '#fff',
        borderWidth: 2,
        borderColor: '#815fc0',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },
    secretData: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: '700',
    },
    secret: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: '#0ee5e5',
    },
    email: {
        fontSize: 14,
        color: '#157c7c',
    },

});

export default SecretsList;