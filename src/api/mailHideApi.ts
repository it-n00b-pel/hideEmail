import axios, {AxiosResponse} from 'axios';
import {LoginData} from '../store/reducers/appReducer';
import {getDataRead} from '../utils';

let TOKEN = '';
getDataRead().then(res => TOKEN = res);

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

export const emailApi = {
    getEmail(): Promise<AxiosResponse> {
        console.log(TOKEN);
        return instance.get('emails');
    },
};