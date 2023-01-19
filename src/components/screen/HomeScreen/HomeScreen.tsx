import React, {useEffect, useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useAppNavigation} from '../types';
import {fetchSecretEmailsList} from '../../../store/reducers/secretsEmailsReducer';
import SecretsList from './SecretsList';
import AddNewEmail from './modals/AddNewEmail';

const HomeScreen: React.FC = () => {
    const {isLogin} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const navigation = useAppNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchSecretEmailsList()).then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        !isLogin && navigation.navigate('Authorization');
    }, [isLogin]);

    return (
        <GradientContainer component={
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing}
                                                        onRefresh={onRefresh}/>}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Ваши email</Text>
                    <AddNewEmail/>
                    <SecretsList/>
                </View>
            </ScrollView>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#44D9E8',
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
});

export default HomeScreen;