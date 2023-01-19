import React, {useState} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import CurrentTariff from './CurrentTariff';
import Emails from './Emails';
import HideSubscription from './HideSubscription';
import HideProSubscription from './HideProSubscription';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {fetchSubscription} from '../../../store/reducers/subscriptionReducer';

const SubscriptionContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const subscription = useAppSelector(state => state.subscription);
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
                    <Emails emails={subscription.emails}/>
                    <HideSubscription/>
                    <HideProSubscription/>
                </View>
            </ScrollView>
        }/>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        marginBottom: 65,
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        width: 120,
        height: 45,
        backgroundColor: '#44D9E8',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#180830',
    },
});

export default SubscriptionContainer;