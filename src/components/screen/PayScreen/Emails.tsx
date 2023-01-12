import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, width} from '../../../constants/Constants';

const Emails: React.FC = () => {
    return (
        <View>
            <Text style={styles.title}>Emails</Text>
            <View style={styles.container}>
                <View style={styles.email}>
                    <View style={{width: width / 2 + 40}}><Text style={styles.text}>shanahsdssfan.emelidsfe@mailhi.ru</Text></View>
                    <View><Text style={styles.text}>12-01-2023</Text></View>
                </View>

                <View style={styles.email}>
                    <Text style={styles.text}>mummintrol@gmail.com</Text>
                    <Text style={styles.text}>12-01-2023</Text>
                </View>

                <View style={styles.email}>
                    <View style={{width: width / 2}}><Text style={styles.text}>mummintrol@gmail.com</Text></View>
                    <View><Text style={styles.text}>12-01-2023</Text></View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        fontWeight:"600",
        fontSize: 32,
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