import React from 'react';
import GradientContainer from '../GradientContainer';
import {Text, View} from 'react-native';

const HomeScreen: React.FC = () => {
    return (
        <GradientContainer component={
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>HomeScreen!</Text>
            </View>
        }/>
    );
};



export default HomeScreen;