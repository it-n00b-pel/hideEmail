import React, {useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView} from 'react-native';
import CurrentTariff from './CurrentTariff';
import Emails from './Emails';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchSubscription} from '../../../store/reducers/subscriptionReducer';
import CardsList from './CardsList';
import {StyledContainer} from '../../../styles/components';
import PlansContainer from './plans/PlansContainer';

const SubscriptionContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const subscription = useAppSelector(state => state.subscription.subscription);
    const emails = useAppSelector(state => state.secrets.emails);
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
                    {emails.length && <Emails emails={emails} canAddEmail={subscription.can_add_email}/>}
                    <PlansContainer/>
                    {subscription.cards.length > 0 && <CardsList cards={subscription.cards}/>}
                </StyledContainer>
            </ScrollView>
        }/>
    );
};

export default SubscriptionContainer;