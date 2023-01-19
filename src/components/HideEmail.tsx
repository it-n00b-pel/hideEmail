import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icons} from './TabIcons/Icons';
import SubscriptionContainer from './screen/SubscriptionScreen/SubscriptionContainer';
import SupportScreen from './screen/SupportScreen/SupportScreen';
import HomeScreen from './screen/HomeScreen/HomeScreen';
import TabButton from './TabIcons/TabButton';

const Tab = createBottomTabNavigator();

export const TabArr = [
    {route: 'Pay', label: 'Pay', type: Icons.MaterialIcons, icon: 'credit-card', component: SubscriptionContainer, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
    {route: 'Home', label: 'Home', type: Icons.MaterialIcons, icon: 'alternate-email', component: HomeScreen, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
    {route: 'Support', label: 'Support', type: Icons.MaterialIcons, icon: 'contact-support', component: SupportScreen, color: 'rgba(110,65,191,0.9)', alphaClr: 'rgba(24,8,48,0.9)'},
];

export default function HideEmail() {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    height: 60,
                    paddingBottom: 10,
                    borderTopWidth: 0,
                    backgroundColor: 'rgba(14,229,229,0)',

                    shadowColor: 'rgba(255,255,255,0)',
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    //
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

    );
}


