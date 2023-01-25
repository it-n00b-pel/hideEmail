import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigationState} from '@react-navigation/native';
import {useAppDispatch} from '../../store/store';
import {logOut} from '../../store/reducers/appReducer';
import {Colors} from '../../constants/Constants';

type GradientContainerPropsType = {
    component: React.ReactNode
}

const GradientContainer: React.FC<GradientContainerPropsType> = ({component}) => {
    const screenName = useNavigationState((state) => state.routes[state.index].name);
    const dispatch = useAppDispatch();

    const isShowLogout = screenName === 'Home' ? <TouchableOpacity onPress={() => dispatch(logOut())}>
        <MaterialIcons name="exit-to-app" size={24} color="#e44c55"/>
    </TouchableOpacity> : <></>;

    return (
        <LinearGradient
            colors={[Colors.Dark, Colors.Primary, Colors.Lite]}
            style={styles.mainGradient}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 0.9}}>
            {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
            <View style={styles.textLogo}>
                <TouchableOpacity>
                    <Text style={styles.text}>mailHide</Text>
                </TouchableOpacity>
                {isShowLogout}
            </View>
            <View style={styles.line}/>
            {component}
            {/*</ScrollView>*/}
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    mainGradient: {
        // width: '100%',
        // height: '100%',
        flex:1
    },
    textLogo: {
        paddingTop: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 42,
        color: Colors.Lite,
        textShadowColor: Colors.ShadowWhite,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

    line: {
        marginTop: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        padding: 1,
        backgroundColor: Colors.White,
        borderRadius: 3,
        shadowColor: Colors.White,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
    },
});

export default GradientContainer;