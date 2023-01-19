import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import {EmailType} from '../../../api/mailHideApi';

type EmailsPropsType = {
    emails: EmailType[]
}

const Emails: React.FC<EmailsPropsType> = ({emails}) => {

    const emailList = emails.map(email => {
        const date = new Date(email.ended_at);
        const endedDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();
        return <View key={email.id} style={styles.email}>
            <View>
                <Text style={styles.text}>{email.address}</Text></View>
            <View>
                <Text style={styles.text}>{endedDate}</Text>
            </View>
        </View>;
    });

    return (
        <View>
            <Text style={styles.title}>Emails</Text>
            <View style={styles.container}>
                {emailList}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontWeight: '600',
        fontSize: 32,
        color: Colors.primaryLite,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    container: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1A0933',
        shadowColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#815fc0',
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
        backgroundColor: '#250d49',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        padding: 5,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

});

export default Emails;