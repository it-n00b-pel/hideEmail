import React, {useEffect} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {Text, View} from 'react-native';
import {useAppSelector} from '../../../store/store';
import {useAppNavigation} from '../types';

const HomeScreen: React.FC = () => {
    const {isLogin} = useAppSelector(state => state.app);
    const navigation = useAppNavigation();
    useEffect(()=>{
        !isLogin && navigation.navigate('Authorization')
    },[isLogin])

    return (
        <GradientContainer component={
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>HomeScreen!</Text>
            </View>
        }/>
    );
};

export default HomeScreen;