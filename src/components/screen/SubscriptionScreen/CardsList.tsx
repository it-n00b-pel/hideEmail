import React from 'react';
import {CardType} from '../../../api/mailHideApi';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {Colors} from '../../../constants/Constants';

type CardsListPropsType = {
    cards: CardType[]
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
        <View key={card.id} style={styles.container}>
            <Text style={[styles.text, {marginTop: 30}]}>Bank Card</Text>
            <View style={styles.cardNumber}>
                {cardType(card)}
                <Text style={[styles.text, {fontSize: 34}]}>{card.first6.substring(0, 4)} {card.first6.substring(4, 6)}** **** {card.last4}</Text>
            </View>

            <View style={styles.cardNumber}>
                <Text style={[styles.text, {fontSize: 18}]}>{card.expiry_month}/{card.expiry_year}</Text>
                <Text style={[styles.text, {fontSize: 18}]}>{card.card_type}</Text>
            </View>
        </View>,
    );

    return (
        <View style={{flexDirection: 'column'}}>
            <Text style={styles.title}>Привязанные карты</Text>
            {cardsList}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#1A0933',
        shadowColor: '#1A0933',
        borderWidth: 2,
        borderColor: '#815fc0',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 6,
    },
    title: {
        marginTop: 20,
        fontWeight: '600',
        fontSize: 32,
        color: Colors.primaryLite,
        textShadowColor: 'rgb(134,4,136)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
    cardNumber: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default CardsList;