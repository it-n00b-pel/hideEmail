import React from 'react';
import {CardType} from '../../../api/mailHideApi';
import {View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {generalStyles, StyledBorderBlock, StyledCardNumber, StyledText, StyledTitle} from '../../../styles/components';

type CardsListPropsType = {
    cards: CardType[],
}

const CardsList: React.FC<CardsListPropsType> = ({cards}) => {

    const cardType = (card: CardType) => {
        switch (card.card_type) {
            case 'MasterCard' :
                return <FontAwesome5 name="cc-mastercard" size={24} color="white"/>;
            case 'Visa' :
                return <FontAwesome5 name="cc-visa" size={24} color="white"/>;
            default:
                return <FontAwesome5 name="credit-card" size={24} color="white"/>;
        }
    };

    const cardsList = cards.map(card =>
        <StyledBorderBlock key={card.id} style={generalStyles.borderBlock}>
            <StyledText fontSize={24} style={{marginTop: 20}}>Bank Card</StyledText>

            <StyledCardNumber>
                {cardType(card)}
                <StyledText fontSize={28}>{card.first6.substring(0, 4)} {card.first6.substring(4, 6)}** **** {card.last4}</StyledText>
            </StyledCardNumber>

            <StyledCardNumber>
                <StyledText fontSize={18}>{card.expiry_month}/{card.expiry_year}</StyledText>
                <StyledText fontSize={18}>{card.card_type}</StyledText>
            </StyledCardNumber>
        </StyledBorderBlock>,
    );

    return (
        <View>
            <StyledTitle fontSize={32} fontWeight={600}>Привязанные карты</StyledTitle>
            {cardsList}
        </View>
    );
};

export default CardsList;