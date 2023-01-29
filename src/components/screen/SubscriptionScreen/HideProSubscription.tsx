import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import SuperButton from '../../superComponents/SuperButton';
import {generalStyles, StyledBorderBlock, StyledColorLine, StyledText} from '../../../styles/components';

const HideProSubscription: React.FC = () => {

    // const handlePress = useCallback(async () => {
    //     const supported = await Linking.canOpenURL('https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043');
    //     if (supported) {
    //         await Linking.openURL('https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043');
    //     } else {
    //         Alert.alert(`Don't know how to open this URL: ${'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2b52101d-000f-5000-a000-15583075a043'}`);
    //     }
    // }, []);

    return (
        <View>
            <StyledBorderBlock borderColor={Colors.Secondary} style={generalStyles.borderBlock}>
                <StyledText fontSize={28} fontWeight={600}>Тариф Hide PRO</StyledText>
                <StyledText fontSize={20}>269 руб.</StyledText>
                <StyledText fontSize={20}>Подключайте любое кол-во email</StyledText>

                <StyledColorLine color={Colors.Secondary}/>

                <StyledText fontSize={20}>Неограниченное кол-во email получателей</StyledText>
                <StyledText fontSize={20}>Неограниченное кол-во новых email</StyledText>
                <StyledText fontSize={20}>Онлайн поддержка клиентов</StyledText>

                <StyledColorLine color={Colors.Secondary}/>

                <SuperButton title={'Подключить на месяц 269 руб'} handlePress={() => {
                }}/>
            </StyledBorderBlock>
        </View>
    );
};

export default HideProSubscription;