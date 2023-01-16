import axios, {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};