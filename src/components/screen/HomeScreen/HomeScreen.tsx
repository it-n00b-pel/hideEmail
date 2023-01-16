import React, {useEffect} from 'react';
import GradientContainer from '../../superComponents/GradientContainer';
import {Text, View} from 'react-native';

const HomeScreen: React.FC = () => {

    useEffect(()=>{

    },[])

    return (
        <GradientContainer component={
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>HomeScreen!</Text>
            </View>
        }/>
    );
};

export default HomeScreen;