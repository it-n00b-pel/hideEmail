import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, width} from '../../../constants/Constants';

const CurrentTariff: React.FC = () => {
    return (
        <View>
            <Text style={styles.title}>Активная подписка</Text>
            <View style={styles.container}>
                <Text style={[styles.text, {fontSize: 28, fontWeight: '600'}]}>Тариф Триал</Text>
                <Text style={styles.text}>Временная подписка до 19.01.2023</Text>
                <Text style={styles.text}>Кол-во новых email: 0 / 3</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
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
        shadowColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#815fc0',
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

});

export default CurrentTariff;