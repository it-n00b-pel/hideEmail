import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import SuperButton from '../../superComponents/SuperButton';

const HideProSubscription: React.FC = () => {

    // const handlePress = useCallback(async () => {
    //     const supported = await Linking.canOpenURL('https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043');
    //     if (supported) {
    //         await Linking.openURL('https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043');
    //     } else {
    //         Alert.alert(`Don't know how to open this URL: ${'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043'}`);
    //     }
    // }, []);

    return (
        <View>
            <View style={styles.container}>
                <Text style={[styles.text, {fontSize: 28, fontWeight: '600', paddingVertical: 0}]}>Тариф Hide PRO</Text>
                <Text style={styles.text}>269 руб.</Text>
                <Text style={styles.text}>Подключайте любое кол-во email</Text>

                <View
                    style={{
                        borderTopColor: Colors.Secondary,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: 2,
                        marginHorizontal: -10,
                    }}
                />

                <Text style={styles.text}>Неограниченное кол-во email получателей</Text>
                <Text style={styles.text}>Неограниченное кол-во новых email</Text>
                <Text style={styles.text}>Онлайн поддержка клиентов</Text>

                <View
                    style={{
                        borderTopColor: Colors.Secondary,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: 2,
                        marginHorizontal: -10,
                    }}
                />

                <SuperButton title={'Подключить на месяц 269 руб'} handlePress={() => {
                }}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 32,
        fontWeight: '600',
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        textShadowRadius: 5,
    },
    container: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.Dark,
        shadowColor: Colors.Secondary,
        borderWidth: 2,
        borderColor: Colors.Secondary,
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

export default HideProSubscription;