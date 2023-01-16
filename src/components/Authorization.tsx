import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppNavigation} from './screen/types';
import {LinearGradient} from 'expo-linear-gradient';
import SuperTextField from './superComponents/SuperTextField';
import {Formik} from 'formik';
import SuperButton from './superComponents/SuperButton';

type FormikErrorType = {
    email?: string,
    password?: string,
}

const Authorization: React.FC = () => {
    const navigation = useAppNavigation();
    const [isBlockButton, setBlockButton] = useState(true);
    const [hasCode, setHasCode] = useState(false);
    const errors: FormikErrorType = {};

    const sendCode = async () => {

    };

    return (
        <LinearGradient
            colors={['#070210', '#000e5d', '#0538b7']}
            style={styles.mainGradient}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 1.3}}>

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

                        if (hasCode && values.password.length < 6) {
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
                        if (hasCode) {
                            navigation.navigate('HideMail');
                            setHasCode(false);
                        } else {
                            setHasCode(true);
                        }
                    }}

            >
                {({handleChange, handleBlur, handleSubmit, values, touched}) => (
                    <View style={styles.container}>
                        <SuperTextField label={'Ваш email'} onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        style={{marginTop: 20, width: '100%'}}
                                        errorText={errors.email}/>

                        {!hasCode ?
                            <SuperButton title={'Получить код'} handlePress={handleSubmit} isBlockButton={isBlockButton}/>
                            :
                            <View style={{width: '100%'}}>
                                <SuperTextField label={'Код'}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                style={{marginTop: 20}}
                                                errorText={errors.password}/>
                                <SuperButton title={'Вход'} handlePress={handleSubmit} isBlockButton={isBlockButton}/>
                                <Text style={styles.text}>Если вашего аккаунта нет, мы его создадим.
                                    Запомните пароль</Text>
                            </View>
                        }
                    </View>
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
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        color: '#c7309c',
        textAlign: 'center',
    },

});

export default Authorization;