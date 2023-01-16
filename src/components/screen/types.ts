import {NavigationProp, useNavigation} from '@react-navigation/native';

export type RootTabParamsList = {
    Home: undefined,
    Pay: undefined,
    Support: undefined,
}

export type RootStackParamsList = {
    Authorization: undefined,
    HideMail: undefined,
}

export type NavigationUseType = NavigationProp<RootTabParamsList & RootStackParamsList>
export const useAppNavigation = () => useNavigation<NavigationUseType>();