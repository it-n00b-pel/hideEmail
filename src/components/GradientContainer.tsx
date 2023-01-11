import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

type GradientContainerPropsType = {
    component: React.ReactNode
}

const GradientContainer: React.FC<GradientContainerPropsType> = ({component}) => {
    return (
        <LinearGradient
            colors={['#180830', '#6e41bf', '#44D9E8']}
            style={styles.mainGradient}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 0.9}}>
            <View style={styles.textLogo}>
                <Text style={styles.text}>hideEmail</Text>
            </View>
            {component}
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    mainGradient: {
        width: '100%',
        height: '100%',
    },
    textLogo: {
        marginTop: 40,
        marginLeft: 20,
    },
    text: {
        fontSize: 36,
        color: '#44D9E8', textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

});
export default GradientContainer;