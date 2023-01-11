import GradientContainer from '../GradientContainer';
import {Text, View} from 'react-native';
import React from 'react';

const SupportScreen: React.FC = () => {
    return (
        <GradientContainer component={
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>SupportScreen!</Text>
            </View>
        }/>
    );
};

export default SupportScreen;