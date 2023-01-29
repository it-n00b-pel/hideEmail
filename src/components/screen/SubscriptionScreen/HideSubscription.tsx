import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../../constants/Constants';
import SuperButton from '../../superComponents/SuperButton';
import {generalStyles, StyledBorderBlock, StyledColorLine, StyledText} from '../../../styles/components';

const HideSubscription: React.FC = () => {
    return (
        <View>
            <StyledBorderBlock borderColor={Colors.Success} style={generalStyles.borderBlock}>
                <StyledText fontSize={28} fontWeight={600}>Тариф Hide</StyledText>
                <StyledText fontSize={20}>169 руб.</StyledText>
                <StyledText fontSize={20}>Рассчитан на 1 ваш email</StyledText>

                <StyledColorLine color={Colors.Success}/>

                <StyledText fontSize={20}>Кол-во email получателей: 1</StyledText>
                <StyledText fontSize={20}>Неограниченное кол-во новых email</StyledText>
                <StyledText fontSize={20}>Онлайн поддержка клиентов</StyledText>

                <StyledColorLine color={Colors.Success}/>

                <SuperButton title={'Подключить на месяц 169 руб'} handlePress={() => {
                }}/>
            </StyledBorderBlock>
        </View>
    );
};

export default HideSubscription;