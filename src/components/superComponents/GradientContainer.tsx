import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {width} from '../../constants/Constants';
import {useNavigationState} from '@react-navigation/native';
import {useAppDispatch} from '../../store/store';
import {logOut} from '../../store/reducers/appReducer';

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
            colors={['#180830', '#6e41bf', '#44D9E8']}
            style={styles.mainGradient}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 0.9}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.textLogo}>
                    <TouchableOpacity>
                        <Text style={styles.text}>mailHide</Text>
                    </TouchableOpacity>
                    {isShowLogout}
                </View>
                <View
                    style={styles.line}
                />
                {component}
            </ScrollView>

        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    mainGradient: {
        width: '100%',
        height: '100%',
    },
    textLogo: {
        // marginTop: 25,
        // marginHorizontal: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    text: {
        fontSize: 42,
        color: '#44D9E8',
        // width: 180,
        textShadowColor: 'rgba(255,255,255,0.75)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 5,
    },

    line: {
        marginTop: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        width: width - 40,

        padding: 1,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        shadowColor: '#ffffff',
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