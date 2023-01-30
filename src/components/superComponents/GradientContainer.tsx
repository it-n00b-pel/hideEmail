import React from 'react';
import {TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigationState} from '@react-navigation/native';
import {useAppDispatch} from '../../store/store';
import {logOut} from '../../store/reducers/appReducer';
import {Colors} from '../../constants/Constants';
import {StyledColorLine, StyledMainHeader, StyledTitle} from '../../styles/components';
import {useAppNavigation} from '../../utils/types';

type GradientContainerPropsType = {
    component: React.ReactNode
}

const GradientContainer: React.FC<GradientContainerPropsType> = ({component}) => {
    const screenName = useNavigationState((state) => state.routes[state.index].name);
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();

    const isShowLogout = screenName === 'Home' ? <TouchableOpacity onPress={() => dispatch(logOut())}>
        <MaterialIcons name="exit-to-app" size={24} color="#e44c55"/>
    </TouchableOpacity> : <></>;

    return (
        <LinearGradient
            colors={[Colors.Dark, Colors.Primary, Colors.Lite]}
            style={{flex: 1}}
            start={{x: 0.5, y: 0.05}}
            end={{x: 0.5, y: 0.9}}
        >
            <StyledMainHeader>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <StyledTitle fontSize={42}>mailHide</StyledTitle>
                </TouchableOpacity>
                {isShowLogout}
            </StyledMainHeader>
            <StyledColorLine color={Colors.White}/>

            {component}
        </LinearGradient>
    );
};

export default GradientContainer;