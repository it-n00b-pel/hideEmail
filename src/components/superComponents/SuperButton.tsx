import React from 'react';
import {ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/Constants';
import {useAppSelector} from '../../store/store';
import {StyledText} from '../../styles/components';

type Props = React.ComponentProps<typeof TextInput> & {
    title: string
    handlePress?: () => void,
    isBlockButton?: boolean
}

const SuperButton: React.FC<Props> = (props) => {
    const isLoading = useAppSelector(state => state.app.status) === 'loading';
    const {
        title,
        handlePress,
        isBlockButton,
    } = props;
    return (
        // <TouchableHighlight disabled={isBlockButton}
        //                     onPress={handlePress}
        //                     underlayColor="#180830"
        //                     style={styles.button}>
        //     <View>
        //        <View> <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}> {title}</Text></View>
        //         {!isLoading && <ActivityIndicator animating={!isLoading} color={Colors.Lite}/>}
        //     </View>
        <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
            disabled={isBlockButton}
        >
            <View>
                <StyledText fontSize={18} fontWeight={600}> {title}</StyledText>
            </View>
            {isLoading && <ActivityIndicator animating={isLoading} color={Colors.Lite}/>}
        </TouchableOpacity>

        // {/*</TouchableHighlight>*/}
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: Colors.Secondary,
        borderRadius: 3,
        shadowColor: Colors.Secondary,
        borderColor: Colors.Secondary,
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