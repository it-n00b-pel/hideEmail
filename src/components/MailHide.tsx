import React, {useCallback, useEffect} from 'react';
import MainTabNavigator from './MainTabNavigator';
import Authorization from './screen/Authorization';
import ErrorModalHandler from './superComponents/ErrorModalHandler';
import {NavigationContainer} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {checkLoginUser} from '../store/reducers/appReducer';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const MailHide: React.FC = () => {
    const {isLogin, isInitialized} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function prepare() {
             await dispatch(checkLoginUser());
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isInitialized) {
            await SplashScreen.hideAsync();
        }
    }, [isInitialized]);

    if (!isInitialized) {
        return null;
    }

    return (<View
            style={{flex: 1}}
            onLayout={onLayoutRootView}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {isLogin ?
                        <Stack.Screen name="HideMail" component={MainTabNavigator}/>
                        : <Stack.Screen name="Authorization" component={Authorization}/>
                    }
                </Stack.Navigator>
                <ErrorModalHandler/>
            </NavigationContainer>
        </View>
    );
};

export default MailHide;