import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAppNavigation} from './types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {checkLoginUser} from '../../store/reducers/appReducer';

const StartPage: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    const {isLogin, isInitialized} = useAppSelector(state => state.app);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(checkLoginUser());
        }, 2500);

        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        if (isLogin && isInitialized) {
            navigation.navigate('HideMail');
        } else if (isInitialized && !isLogin) {
            navigation.navigate('Authorization');
        }

    }, [isLogin, isInitialized]);

    return (
        <View style={{width: '100%', backgroundColor: '#236546', height: '100%'}}>

        </View>
    );
};

export default StartPage;