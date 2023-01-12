import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Colors, width} from '../../../constants/Constants';

const HideSubscription: React.FC = () => {
    return (
        <View>
            <Text style={styles.title}>Подписки</Text>
            <View style={styles.container}>
                <Text style={[styles.text, {fontSize: 28, fontWeight: '600', paddingVertical: 0}]}>Тариф Hide</Text>
                <Text style={styles.text}>169 руб.</Text>
                <Text style={styles.text}>Рассчитан на 1 ваш email</Text>
                <View
                    style={{
                        borderTopColor: '#00FF40',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: 2,
                        marginHorizontal: -10,
                    }}
                />

                <Text style={styles.text}>Кол-во email получателей: 1</Text>
                <Text style={styles.text}>Неограниченное кол-во новых email</Text>
                <Text style={styles.text}>Онлайн поддержка клиентов</Text>
                <View
                    style={{
                        borderTopColor: '#00FF40',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: 2,
                        marginHorizontal: -10,
                    }}
                />

                <TouchableHighlight onPress={() => {
                }}
                                    underlayColor="#180830"
                                    style={styles.button}>
                    <View>
                        <Text style={{fontSize: 22, fontWeight: '700', color: 'white'}}>
                            Подключить на месяц 169 руб
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 32,
        fontWeight: '600',
        color: Colors.primaryLite,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    container: {
        marginTop: 10,
        padding: 10,
        width: width - 40,
        backgroundColor: '#1A0933',
        shadowColor: '#00FF40',
        borderWidth: 2,
        borderColor: '#00FF40',
        borderRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        color: 'white',
        fontSize: 22,
        paddingVertical: 5,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        height: 45,
        backgroundColor: '#c7309c',
        borderRadius: 3,
        shadowColor: '#c7309c',
        borderColor: '#c7309c',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },

});
export default HideSubscription;