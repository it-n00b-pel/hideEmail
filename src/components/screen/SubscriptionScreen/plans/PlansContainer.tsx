import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../../../../store/store';
import {StyledTitle} from '../../../../styles/components';
import HideSubscription from './HideSubscription';
import HideProSubscription from './HideProSubscription';

const PlansContainer: React.FC = () => {
    const currentPlanId = useAppSelector(state => state.subscription.subscription.self_plan.planId);

    const plans = () => {
        switch (currentPlanId) {
            case 1 :
                return <View>
                    <HideSubscription/>
                    <HideProSubscription/>
                </View>;
            case 2 :
                return <HideProSubscription/>;
            default:
                <></>;
        }
    };

    if (currentPlanId === 3) return null;

    return (
        <View>
            <StyledTitle fontSize={32} fontWeight={600}>Доступные подписки</StyledTitle>
            {plans()}
        </View>
    );
};

export default PlansContainer;