import React from 'react';
import {CardType} from '../../../api/mailHideApi';
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

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
            <Text style={[styles.title, {marginTop: 30}]}>Bank Card</Text>
            <View style={styles.cardNumber}>
                {cardType(card)}
                <Text style={[styles.title, {fontSize: 36}]}>{card.first6}******{card.last4}</Text>
            </View>

            <View style={styles.cardNumber}>
                <Text style={[styles.title, {fontSize: 18}]}>{card.expiry_month}/{card.expiry_year}</Text>
                <Text style={[styles.title, {fontSize: 18}]}>{card.card_type}</Text>
            </View>
        </View>,
    );

    return (
        <View style={{flexDirection: 'column'}}>
            {cardsList}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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