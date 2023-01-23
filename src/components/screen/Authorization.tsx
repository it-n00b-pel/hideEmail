import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppNavigation} from './types';
import {LinearGradient} from 'expo-linear-gradient';
import SuperTextField from '../superComponents/SuperTextField';
import {Formik} from 'formik';
import SuperButton from '../superComponents/SuperButton';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchCode, login, setCode} from '../../store/reducers/appReducer';
import {MaterialIcons} from '@expo/vector-icons';

type FormikErrorType = {
    email?: string,
    password?: string,
}

const Authorization: React.FC = () => {
    const navigation = useAppNavigation();
    const [isBlockButton, setBlockButton] = useState(true);
    const errors: FormikErrorType = {};
    const {isCode, isLogin} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    const ArrowBack = isCode ? <TouchableOpacity style={styles.backButton} onPress={() => dispatch(setCode({isCode: false}))}>
        <MaterialIcons name="arrow-back" size={24} color="white"/>
        <Text style={{color: 'white'}}>back</Text>
    </TouchableOpacity> : <></>;

    useEffect(() => {
        isLogin && navigation.navigate('HideMail');
    }, [isLogin]);

    return (
        <LinearGradient
            colors={['#070210', '#000e5d', '#0538b7']}
            style={styles.mainGradient}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 1.3}}>
            {ArrowBack}
            <Formik initialValues={{
                email: '',
                password: '',
            }}
                    validate={(values) => {
                        if (!values.email) {
                            errors.email = 'Required';
                            setBlockButton(true);
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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
                            // navigation.navigate('HideMail');
                            dispatch(login({email: values.email, password: values.password}));
                            // values.email = '';
                            //  values.password = '';
                        } else {
                            dispatch(fetchCode(values.email));
                            // values.email = '';
                             values.password = '';
                        }

                    }}

            >
                {({handleChange, handleBlur, handleSubmit, values}) => (

                    <ScrollView keyboardShouldPersistTaps="handled">

                        <View style={styles.container}>
                            <SuperTextField label={'Ваш email'} onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            editable={!isCode}
                                            style={{marginTop: 20, width: '100%'}}
                                            errorText={errors.email}/>

                            {!isCode ?
                                <SuperButton title={'Получить код'} handlePress={handleSubmit} isBlockButton={isBlockButton}/>
                                :
                                <View style={{width: '100%'}}>
                                    <SuperTextField label={'Код'}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    value={values.password}
                                                    keyboardType="numeric"
                                                    style={{marginTop: 20}}
                                                    errorText={errors.password}/>
                                    <SuperButton title={'Вход'} handlePress={handleSubmit} isBlockButton={isBlockButton}/>
                                    <Text style={styles.text}>Если вашего аккаунта нет, мы его создадим.
                                        Запомните пароль.</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                )}

            </Formik>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainGradient: {
        width: '100%',
        height: '100%',
        padding: 30,
        display: 'flex',
    },
    backButton: {
        width: 50,
        height: 30,
        position: 'absolute',
        top: 30,
        left: 30,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50%',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#c7309c',
        textAlign: 'center',
    },

});

export default Authorization;