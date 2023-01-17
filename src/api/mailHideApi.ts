import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {LoginData} from '../store/reducers/appReducer';
import {getDataRead} from '../utils';

export let instance: AxiosInstance;

(async () => {
    // const token = await AsyncStorage.getItem('token');
    const token = await getDataRead();
    instance = axios.create({
        withCredentials: true,
        baseURL: 'https://my.mailhide.ru/api/v1/',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
})();

// export const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://my.mailhide.ru/api/v1/',
//     headers: {
//         'Authorization': 'Bearer ' + token,
//     },
// });

export const authApi = {
    sendCode(email: string): Promise<AxiosResponse> {
        return instance.post('code/email', {email});
    },
    authorization(loginData: LoginData): Promise<AxiosResponse<{ token: string }>> {
        return axios.post('https://my.mailhide.ru/api/v1/login', loginData);
    },
};

export const subscriptionApi = {
    getSubscription(): Promise<AxiosResponse<SubscriptionResponseType>> {
        return instance.get('sub');
    },
};

export const secretsApi = {
    getSecretsEmails(): Promise<AxiosResponse<{ secrets: SecretType[] }>> {
        return instance.get('secrets');
    },
    generateEmail(): Promise<AxiosResponse<{ secret_email: string }>> {
        return instance.post('secrets/generate');
    },
    getSimpleEmailList(): Promise<AxiosResponse<GetSimpleEmailsListResponseType>> {
        return instance.get('emails');
    },
    addNewSecretEmail(secretData: any): Promise<AxiosResponse> {
        return instance.post('secrets', secretData);
    },
};

export type SecretDataType = {
    secret_email: string,
    email: string,
    title: string
}

export type GetSimpleEmailsListResponseType = {
    emails: Array<{ address: string }>,
}

export type SubscriptionResponseType = {
    emails: EmailType[],
    can_add_email: boolean,
    emails_total: number,
    emails_used: number,
    alias_total: number,
    alias_used: number,
    ended_at: Date,
    cards: Array<any>,
    plans: Array<any>,
    self_plan: {}
}

export type EmailType = {
    id: number,
    user_id: number,
    address: string,
    started_at: Date,
    ended_at: Date,
    created_at: Date,
    updated_at: Date
}

export type SecretType = {
    id: number,
    title: string,
    email: string,
    alias: string,
}