import GradientContainer from '../GradientContainer';
import {ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, width} from '../../constants/Constants';

const SupportScreen: React.FC = () => {
    const [value, setValue] = useState('');

    return (
        <GradientContainer component={
            <View style={styles.container}>
                <Text style={styles.title}>Поддержка</Text>
                <Text style={[styles.title, {fontSize: 20, marginTop: 20}]}>Сообщение</Text>

                <ScrollView keyboardShouldPersistTaps="handled" >
                    <TextInput style={styles.input}
                               value={value}
                               onChangeText={text => setValue(text)}
                               numberOfLines={10}
                               multiline
                        // placeholder="Type here your fucking problem"
                               placeholderTextColor="rgba(110,65,191,0.9)"
                    />
                    <TouchableHighlight onPress={() => {}}
                                        underlayColor="#180830"
                                        style={styles.button}>
                        <View>
                            <Text style={{fontSize: 22, fontWeight: '700', color: 'white'}}>Send</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>


            </View>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        paddingLeft: 20,
        flex: 1,

    },
    title: {
        fontSize: 32,
        color: Colors.primaryLite,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

    input: {
        width: width - 40,
        minHeight: 100,
        maxHeight: 250,
        fontSize: 20,
        backgroundColor: Colors.primaryDark,
        color: 'white',
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        width: 120,
        height: 45,
        backgroundColor: '#44D9E8',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#180830',
    },

});

export default SupportScreen;