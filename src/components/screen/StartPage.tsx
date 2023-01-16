import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
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
        <View style={{width: '100%', backgroundColor: '#000', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image
                source={require('../../assets/img/image_processing20210911-8144-1jb2kfa.gif')}
                style={{width: 100, height: 100}}
            />
            <Text style={{color: '#fff'}}>Mail Hide</Text>
        </View>
    );
};

export default StartPage;