import React from 'react';
import {View} from 'react-native';
import {SubscriptionResponseType} from '../../../api/mailHideApi';
import {generalStyles, StyledBorderBlock, StyledText, StyledTitle} from '../../../styles/components';

type CurrentTariffPropsType = {
    subscription: SubscriptionResponseType,
}

const CurrentTariff: React.FC<CurrentTariffPropsType> = ({subscription}) => {
    const date = new Date(subscription.ended_at);
    const endedDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear();

    return (
        <View>
            <StyledTitle fontSize={32} fontWeight={600}>Активная подписка</StyledTitle>

            <StyledBorderBlock style={generalStyles.borderBlock}>
                <StyledText fontSize={28} fontWeight={600}>{subscription.self_plan.title}</StyledText>
                <StyledText fontSize={20}>Временная подписка до {endedDate}</StyledText>
                <StyledText fontSize={18}>Кол-во email получателей: {subscription.emails_used}/{subscription.emails_total === 0 ? '∞' : subscription.emails_total}</StyledText>
                <StyledText fontSize={18}>Кол-во новых email: {subscription.alias_used}/{subscription.alias_total === 0 ? '∞' : subscription.alias_total}</StyledText>
            </StyledBorderBlock>
        </View>
    );
};

export default CurrentTariff;