import React from 'react';
import {Alert, Linking, View} from 'react-native';
import {Colors} from '../../../../constants/Constants';
import SuperButton from '../../../superComponents/SuperButton';
import {generalStyles, StyledBorderBlock, StyledColorLine, StyledText} from '../../../../styles/components';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {fetchUrlForPay} from '../../../../store/reducers/subscriptionReducer';

const HideProSubscription: React.FC = () => {
    const hideProPlan = useAppSelector(state => state.subscription.plans).filter(p => p.planId === 3)[0];
    const dispatch = useAppDispatch();
    const redirectForPay = () => {
        dispatch(fetchUrlForPay(hideProPlan.planId)).then(async res => {
            console.log(res.payload);
            const supported = await Linking.canOpenURL(res.payload as string);
            if (supported) {
                await Linking.openURL(res.payload as string);
                Alert.alert('', `Please refresh page`, [
                    {text: 'Ok', style: 'cancel'}]);
            } else {
                Alert.alert(`Don't know how to open this URL: ${res.payload}`);
            }
        });
    };

    return (
        <View>
            <StyledBorderBlock borderColor={Colors.Secondary} style={generalStyles.borderBlock}>
                <StyledText fontSize={28} fontWeight={600}>{hideProPlan?.title}</StyledText>
                <StyledText fontSize={20}>{hideProPlan?.price} руб.</StyledText>
                <StyledText fontSize={20}>{hideProPlan?.description}</StyledText>

                <StyledColorLine color={Colors.Secondary}/>

                <StyledText fontSize={20}>Неограниченное кол-во email получателей</StyledText>
                <StyledText fontSize={20}>Неограниченное кол-во новых email</StyledText>
                <StyledText fontSize={20}>Онлайн поддержка клиентов</StyledText>

                <StyledColorLine color={Colors.Secondary}/>

                <SuperButton title={'Подключить на месяц 269 руб'} handlePress={redirectForPay}/>
            </StyledBorderBlock>
        </View>
    );
};

export default HideProSubscription;