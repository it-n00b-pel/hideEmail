import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './src/components/screen/HomeScreen';
import PayScreenContainer from './src/components/screen/PayScreen/PayScreenContainer';
import SupportScreen from './src/components/screen/SupportScreen';
import {Icons} from './src/components/TabIcons/Icons';
import TabButton from './src/components/TabIcons/TabButton';

const Tab = createBottomTabNavigator();

export const TabArr = [
    {route: 'Pay', label: 'Pay', type: Icons.MaterialIcons, icon: 'credit-card', component: PayScreenContainer, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
    {route: 'Home', label: 'Home', type: Icons.MaterialIcons, icon: 'alternate-email', component: HomeScreen, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
    {route: 'Support', label: 'Support', type: Icons.MaterialIcons, icon: 'contact-support', component: SupportScreen, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
];

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                         height: 60,
                        paddingBottom: 10,
                        borderTopWidth: 0,
                        backgroundColor:"rgba(14,229,229,0)",

                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,

                        elevation: 24,
                    },
                }}
            >
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component}
                                    options={{
                                        tabBarShowLabel: false,
                                        // @ts-ignore
                                        tabBarButton: (props) => <TabButton {...props} item={item}/>,
                                    }}
                        />
                    );
                })}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
