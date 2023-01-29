import React, {useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView} from 'react-native';
import CurrentTariff from './CurrentTariff';
import Emails from './Emails';
import HideSubscription from './HideSubscription';
import HideProSubscription from './HideProSubscription';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchSubscription} from '../../../store/reducers/subscriptionReducer';
import CardsList from './CardsList';
import {StyledContainer, StyledTitle} from '../../../styles/components';

const SubscriptionContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const subscription = useAppSelector(state => state.subscription.subscription);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchSubscription()).then(() => {
            setRefreshing(false);
        });
    }, []);

    return (
        <GradientContainer component={
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
            >
                <StyledContainer>
                    <CurrentTariff subscription={subscription}/>
                    {subscription.emails && <Emails emails={subscription.emails} canAddEmail={subscription.can_add_email}/>}
                    <HideSubscription/>
                    <StyledTitle fontSize={32} fontWeight={600}>Подписки</StyledTitle>
                    <HideProSubscription/>
                    {subscription.cards.length && <CardsList cards={subscription.cards}/>}
                </StyledContainer>
            </ScrollView>
        }/>
    );
};

export default SubscriptionContainer;