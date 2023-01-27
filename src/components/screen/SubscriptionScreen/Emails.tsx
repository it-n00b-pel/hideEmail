import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import {EmailType} from '../../../api/mailHideApi';
import AddNewEmail from './modal/AddNewEmail';
import MoreEmailData from './modal/MoreEmailData';

type EmailsPropsType = {
    emails: EmailType[],
    canAddEmail: boolean
}

const Emails: React.FC<EmailsPropsType> = ({emails, canAddEmail}) => {

    const emailList = emails.map(email => {
        const date = new Date(email.ended_at);
        const endedDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();
        return <MoreEmailData email={email} key={email.id} view={<View key={email.id} style={styles.email}>
            <View>
                <Text style={styles.text}>{email.address}</Text></View>
            <View>
                <Text style={styles.text}>{endedDate}</Text>
            </View>
        </View>}/>;
    });

    return (
        <View>
            <Text style={styles.title}>Emails</Text>
            <View style={styles.container}>
                {emailList}
                {canAddEmail && <AddNewEmail/>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontWeight: '600',
        fontSize: 32,
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    container: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.Dark,
        shadowColor: Colors.White,
        borderWidth: 2,
        borderColor: Colors.LightPrimary,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 6,
    },
    email: {
        backgroundColor: Colors.DarkPrimary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: Colors.White,
        fontSize: 16,
        padding: 5,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

});

export default Emails;