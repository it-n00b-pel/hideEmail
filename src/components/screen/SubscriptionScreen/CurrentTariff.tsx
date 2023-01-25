import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import {SubscriptionResponseType} from '../../../api/mailHideApi';

type CurrentTariffPropsType = {
    subscription: SubscriptionResponseType,
}

const CurrentTariff: React.FC<CurrentTariffPropsType> = ({subscription}) => {
    const date = new Date(subscription.ended_at);
    const endedDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

    return (
        <View>
            <Text style={styles.title}>Активная подписка</Text>
            <View style={styles.container}>
                <Text style={[styles.text, {fontSize: 28, fontWeight: '600'}]}>Тариф Триал</Text>
                <Text style={styles.text}>Временная подписка до {endedDate}</Text>
                <Text style={styles.text}>Кол-во email получателей: {subscription.emails_used} / {subscription.emails_total}</Text>
                <Text style={styles.text}>Кол-во новых email: {subscription.alias_used} / {subscription.alias_total}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: '600',
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
    text: {
        color: Colors.White,
        fontSize: 20,
        paddingVertical: 5,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

});

export default CurrentTariff;