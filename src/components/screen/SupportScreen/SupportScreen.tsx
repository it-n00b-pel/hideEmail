import GradientContainer from '../../superComponents/GradientContainer';
import {ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constants/Constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {sendMessage} from '../../../store/reducers/subscriptionReducer';
import {generalStyles, StyledContainer, StyledText, StyledTitle} from '../../../styles/components';

const SupportScreen: React.FC = () => {
    const [value, setValue] = useState('');
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
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

            <ScrollView keyboardShouldPersistTaps="handled">
                <StyledContainer>
                    <StyledTitle fontSize={32} fontWeight={600}>Поддержка</StyledTitle>
                    <StyledTitle fontSize={20} style={{marginTop: 20}}>Сообщение</StyledTitle>
                    <TextInput style={[styles.input, generalStyles.borderBlock]}
                               value={value}
                               onChangeText={text => setValue(text)}
                               multiline
                               placeholderTextColor="rgba(110,65,191,0.9)"
                    />

                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={sendQuestion}
                                          disabled={isLoading}
                                          style={[styles.button, generalStyles.borderBlock]}>
                            <View>
                                <StyledText fontSize={20} fontWeight={600} color={Colors.LightPrimary}>Отправить</StyledText>
                            </View>
                            {isLoading && <ActivityIndicator animating={isLoading} color={Colors.Primary}/>}
                        </TouchableOpacity>
                    </View>
                </StyledContainer>
            </ScrollView>

        }/>
    );
};

const styles = StyleSheet.create({
    input: {
        minHeight: 80,
        maxHeight: 250,
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.Dark,
        borderWidth: 2,
        borderColor: Colors.LightPrimary,
        borderRadius: 10,
    },
    button: {
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 45,
        backgroundColor: Colors.Lite,
        borderWidth: 1,
        borderColor: Colors.ShadowWhite,
        borderRadius: 10,
    },

});

export default SupportScreen;