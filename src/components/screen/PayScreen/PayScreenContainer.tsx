import React, {useEffect} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {StyleSheet, View} from 'react-native';
import CurrentTariff from './CurrentTariff';
import Emails from './Emails';
import HideSubscription from './HideSubscription';
import HideProSubscription from './HideProSubscription';
import {instance} from '../../../api/mailHideApi';

const PayScreenContainer: React.FC = () => {
    useEffect(()=>{
        instance.get('https://my.mailhide.ru/api/v1/sub').then(res=> {
            console.log(res);})
    },[])
    return (
        <GradientContainer component={
            // <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <CurrentTariff/>
                <Emails/>
                <HideSubscription/>
                <HideProSubscription/>
            </View>
            // </ScrollView>
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

export default PayScreenContainer;