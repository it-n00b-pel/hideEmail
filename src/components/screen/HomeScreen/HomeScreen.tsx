import React, {useEffect, useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useAppNavigation} from '../../../utils/types';
import {fetchSecretEmailsList} from '../../../store/reducers/secretsEmailsReducer';
import SecretsList from './SecretsList';
import AddNewSecretEmail from './modals/AddNewSecretEmail';
import {StyledContainer, StyledTitle} from '../../../styles/components';

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
                <StyledContainer>
                    <StyledTitle fontSize={32} fontWeight={600}>Ваши email</StyledTitle>
                    <AddNewSecretEmail/>
                    <SecretsList/>
                </StyledContainer>
            </ScrollView>
        }/>
    );
};

export default HomeScreen;