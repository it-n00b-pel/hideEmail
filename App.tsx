import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HideEmail from './src/components/HideEmail';
import Authorization from './src/components/screen/Authorization';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import StartPage from './src/components/screen/StartPage';
import ErrorModalHandler from './src/components/superComponents/ErrorModalHandler';

const Stack = createNativeStackNavigator();

export default function App() {

    // LogBox.ignoreAllLogs(true);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="StartPage" component={StartPage}/>
                    <Stack.Screen name="Authorization" component={Authorization}/>
                    <Stack.Screen name="HideMail" component={HideEmail}/>
                </Stack.Navigator>
                <ErrorModalHandler/>
            </NavigationContainer>

        </Provider>
    );
}
