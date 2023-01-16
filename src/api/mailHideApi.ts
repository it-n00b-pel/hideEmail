import axios, {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData} from '../store/reducers/appReducer';

const TOKEN = async () => {
    try {
        return await AsyncStorage.getItem('token');
    }
    catch (e) {
        // error reading value
    }
};

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://my.mailhide.ru/api/v1/',
    headers: {
        'Authorization': 'Bearer ' + TOKEN,
    },
});

console.log(instance);

export const authApi = {
    sendCode(email: string): Promise<AxiosResponse> {
        return instance.post('code/email', {email});
    },
    authorization(loginData: LoginData): Promise<AxiosResponse<{ token: string }>> {
        return axios.post('https://my.mailhide.ru/api/v1/login', loginData);
    },
};