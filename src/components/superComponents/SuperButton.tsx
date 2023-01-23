import React from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';

type Props = React.ComponentProps<typeof TextInput> & {
    title: string
    handlePress?: () => void,
    isBlockButton?: boolean
}

const SuperButton: React.FC<Props> = (props) => {
    const {
        title,
        handlePress,
        isBlockButton,
    } = props;
    return (
        <TouchableHighlight disabled={isBlockButton}
                            onPress={handlePress}
                            underlayColor="#180830"
                            style={styles.button}>
           <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}> {title}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#c7309c',
        borderRadius: 3,
        shadowColor: '#c7309c',
        borderColor: '#c7309c',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.99,
        shadowRadius: 5,
        elevation: 12,
    },
});

export default SuperButton;