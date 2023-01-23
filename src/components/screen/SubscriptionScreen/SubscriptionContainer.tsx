import React, {useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import CurrentTariff from './CurrentTariff';
import Emails from './Emails';
import HideSubscription from './HideSubscription';
import HideProSubscription from './HideProSubscription';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchSubscription} from '../../../store/reducers/subscriptionReducer';
import CardsList from './CardsList';

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
                <View style={styles.container}>
                    <CurrentTariff subscription={subscription}/>
                    <Emails emails={subscription.emails} canAddEmail={subscription.can_add_email}/>
                    <HideSubscription/>
                    <HideProSubscription/>
                    {subscription.cards && <CardsList cards={subscription.cards}/>}
                </View>
            </ScrollView>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        paddingHorizontal: 20,
        flex: 1,
        marginBottom: 65,
    },
});

export default SubscriptionContainer;