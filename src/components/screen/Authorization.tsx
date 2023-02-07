import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useAppNavigation} from '../../utils/types';
import {LinearGradient} from 'expo-linear-gradient';
import SuperTextField from '../superComponents/SuperTextField';
import {Formik} from 'formik';
import SuperButton from '../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchCode, login, setCode} from '../../store/reducers/appReducer';
import {MaterialIcons} from '@expo/vector-icons';
import {Colors} from '../../constants/Constants';
import {StyledAuthFooter, StyledContainer, StyledText, StyledTitle} from '../../styles/components';

type FormikErrorType = {
    email?: string,
    password?: string,
}

const Authorization: React.FC = () => {
    const navigation = useAppNavigation();
    const [isBlockButton, setBlockButton] = useState(true);
    const errors: FormikErrorType = {};
    const {isCode, isLogin, status} = useAppSelector(state => state.app);
    const isLoading = status === 'loading';
    const dispatch = useAppDispatch();

    const ArrowBack = isCode ? <TouchableOpacity style={styles.backButton} onPress={() => dispatch(setCode({isCode: false}))}>
        <MaterialIcons name="arrow-back" size={24} color="white"/>
    </TouchableOpacity> : <></>;

    useEffect(() => {
        isLogin && navigation.navigate('HideMail');
    }, [isLogin]);

    return (
        <LinearGradient
            colors={['#070210', '#000e5d', '#0538b7']}
            style={{flex: 1}}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 1.3}}>
            {ArrowBack}

            <Formik initialValues={{
                email: '',
                password: '',
            }}
                    validate={(values) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                            setBlockButton(true);
                        } else {
                            errors.email = '';
                            setBlockButton(false);
                        }

                        if (isCode && values.password.length < 6) {
                            errors.password = 'Min 6 characters';
                            setBlockButton(true);
                        } else {
                            errors.password = '';
                            if (!errors.email.length) {
                                setBlockButton(false);
                            }
                        }
                    }}

                    onSubmit={values => {
                        if (isCode) {
                            dispatch(login({email: values.email, password: values.password}));
                        } else {
                            dispatch(fetchCode(values.email));
                            values.password = '';
                        }
                    }}
            >
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <ScrollView>
                        <StyledContainer center style={{marginTop: 80}}>

                            <StyledTitle fontSize={36}>Mail
                                <StyledTitle fontSize={36} color={Colors.Secondary}>Hide</StyledTitle>
                            </StyledTitle>

                            <View style={{marginTop: 20}}>
                                <StyledText fontSize={14} color={Colors.ShadowWhite}>
                                    MailHide - сервис, позволяющий скрыть адрес Вашей электронной почты с помощью переадресации.
                                    Для входа в приложение, укажите Ваш настоящий e-mail , на который придет код с подтверждением.
                                </StyledText>
                            </View>

                            {!isCode && <SuperTextField label={'Ваш email'} onChangeText={handleChange('email')}
                                                        onBlur={handleBlur('email')}
                                                        value={values.email}
                                                        editable={!isCode}
                                                        style={{marginTop: 30, width: '100%', height: 80}}
                                                        errorText={errors.email}/>
                            }

                            {!isCode ?
                                <SuperButton title={'Получить код'} handlePress={handleSubmit} isBlockButton={isLoading || isBlockButton}/>
                                :
                                <View style={{width: '100%'}}>
                                    <SuperTextField label={'Код'}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    keyboardType="numeric"
                                                    style={{marginTop: 30, height: 80}}
                                                    errorText={errors.password}/>
                                    <SuperButton title={'Вход'} handlePress={handleSubmit} isBlockButton={isLoading || isBlockButton}/>
                                    <StyledText color={Colors.Secondary} center style={{marginTop: 20}}>Если вашего аккаунта нет, мы его создадим.
                                        Запомните пароль.</StyledText>
                                </View>
                            }

                        </StyledContainer>
                    </ScrollView>
                )}
            </Formik>

            <StyledAuthFooter>
                <StyledTitle fontSize={24} fontWeight={600} center color={Colors.Secondary}>Your Email</StyledTitle>
                <StyledTitle fontSize={14} center>hidden by default</StyledTitle>
            </StyledAuthFooter>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 35,
        left: 20,
        zIndex: 1,
    },
});

export default Authorization;