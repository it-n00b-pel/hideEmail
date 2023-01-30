import React from 'react';
import {Alert, Linking, View} from 'react-native';
import {Colors} from '../../../../constants/Constants';
import SuperButton from '../../../superComponents/SuperButton';
import {generalStyles, StyledBorderBlock, StyledColorLine, StyledText} from '../../../../styles/components';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {fetchUrlForPay} from '../../../../store/reducers/subscriptionReducer';

const HideSubscription: React.FC = () => {
    const hidePlan = useAppSelector(state => state.subscription.plans).filter(p => p.planId === 2)[0];
    const dispatch = useAppDispatch()

    const redirectForPay = () =>{
        dispatch(fetchUrlForPay(hidePlan.planId)).then(async res => {
            console.log(res.payload);
            const supported = await Linking.canOpenURL(res.payload as string);
            if (supported) {
                await Linking.openURL(res.payload as string);
                Alert.alert('', `Please refresh page`, [
                    {text: 'Ok', style: 'cancel'}]);
            } else {
                Alert.alert(`Don't know how to open this URL: ${res.payload}`);
            }
        })
    }

    return (
        <View>
            <StyledBorderBlock borderColor={Colors.Success} style={generalStyles.borderBlock}>
                <StyledText fontSize={28} fontWeight={600}>{hidePlan?.title}</StyledText>
                <StyledText fontSize={20}>{hidePlan?.price} руб.</StyledText>
                <StyledText fontSize={20}>{hidePlan?.description}</StyledText>

                <StyledColorLine color={Colors.Success}/>

                <StyledText fontSize={20}>Кол-во email получателей: 1</StyledText>
                <StyledText fontSize={20}>Неограниченное кол-во новых email</StyledText>
                <StyledText fontSize={20}>Онлайн поддержка клиентов</StyledText>

                <StyledColorLine color={Colors.Success}/>

                <SuperButton title={'Подключить на месяц 169 руб'} handlePress={redirectForPay}/>
            </StyledBorderBlock>
        </View>
    );
};

export default HideSubscription;