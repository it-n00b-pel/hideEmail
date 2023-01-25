import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {AppDispatch} from '../store/store';
import {setError, setInitialized, setLogin, setPreloaderStatus} from '../store/reducers/appReducer';

export const storeDataSave = async (key: string,value: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    catch (e) {
        // saving error
    }
};

export const getDataRead = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return await JSON.parse(value);
        }
    }
    catch (e) {
        // error reading value
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    }
    catch (e) {
        // error reading value
    }
};

export const handleServerNetworkError = (error: AxiosError, dispatch: AppDispatch) => {
    const message = error.response?.data ? (error.response?.data as ({ message: string })).message : error.message;
    dispatch(setError({error: {status: error.request.status, message}}));
    dispatch(setPreloaderStatus({status: 'failed'}));
};

export const handleShowStartAnimated = (isLogin: boolean, dispatch: AppDispatch) => {
    const id = setTimeout(() => {
        dispatch(setLogin({isLogin}));
        dispatch(setInitialized({isInitialized: true}));
    }, 2450);
    return () => {
        clearInterval(id);
    };
};