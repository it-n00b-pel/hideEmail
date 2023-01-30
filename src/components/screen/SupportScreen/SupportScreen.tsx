import GradientContainer from '../../superComponents/GradientContainer';
import {ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constants/Constants';
import {useAppDispatch} from '../../../store/store';
import {sendMessage} from '../../../store/reducers/subscriptionReducer';

const SupportScreen: React.FC = () => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const sendQuestion = () => {
        if (value.trim().length) {
            dispatch(sendMessage(value)).then(() => {
                setValue('');
            });
        }
    };

    return (
        <GradientContainer component={
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <Text style={styles.text}>Поддержка</Text>
                    <Text style={[styles.text, {fontSize: 20, marginTop: 20}]}>Сообщение</Text>
                    <TextInput style={styles.input}
                               value={value}
                               onChangeText={text => setValue(text)}
                               multiline
                               placeholderTextColor="rgba(110,65,191,0.9)"
                    />

                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableHighlight onPress={sendQuestion}
                                            underlayColor="#180830"
                                            style={styles.button}>
                            <Text style={{fontSize: 22, fontWeight: '700', color: Colors.White}}>Send</Text>
                        </TouchableHighlight>
                    </View>

                </ScrollView>


            </View>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 10,

        flex: 1,
    },
    text: {
        marginHorizontal: 20,
        fontSize: 32,
        fontWeight: '600',
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    input: {
        marginHorizontal: 20,
        minHeight: 80,
        maxHeight: 250,
        fontSize: 20,
        color: 'white',
        marginTop: 20,
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
    button: {
        marginHorizontal: 20,
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 45,
        backgroundColor: Colors.Lite,
        shadowColor: Colors.White,
        borderWidth: 1,
        borderColor: Colors.ShadowWhite,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 6,
    },

});

export default SupportScreen;