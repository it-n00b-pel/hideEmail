import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {LoginData} from '../store/reducers/appReducer';
import {getDataRead} from '../utils';

export let instance: AxiosInstance;

export async function createAxiosInstance() {
    const token = await getDataRead();
    instance = axios.create({
        withCredentials: true,
        baseURL: 'https://my.mailhide.ru/api/v1/',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
}

export const authApi = {
    sendCode(email: string): Promise<AxiosResponse> {
        return axios.post('https://my.mailhide.ru/api/v1/code/email', {email});
    },
    authorization(loginData: LoginData): Promise<AxiosResponse<{ token: string }>> {
        return axios.post('https://my.mailhide.ru/api/v1/login', loginData);
    },
};

export const subscriptionApi = {
    getSubscription(): Promise<AxiosResponse<SubscriptionResponseType>> {
        return instance.get('sub');
    },
    addNewEmail(data: NewEmailDataType): Promise<AxiosResponse> {
        return instance.post('emails', data);
    },
    getVerifyCode(email: string): Promise<AxiosResponse> {
        return instance.post('emails/verify/code', {email});
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
    getSecretEmailData(id: number): Promise<AxiosResponse<{ secret: CurrentSecretType }>> {
        return instance.get('secrets/' + id);
    },
    deleteSecretEmail(id: number): Promise<AxiosResponse> {
        return instance.delete('secrets/' + id);
    },
};

export type CurrentSecretType = {
    id: number,
    title: string,
    email: string,
    alias: string,
    created_at: Date,
    redirect_count: number
}

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
    cards: CardType[],
    plans: Array<any>,
    self_plan: {}
}

export type CardType = {
    card_type: string,
    created_at: string,
    expiry_month: string,
    expiry_year: string,
    first6: string,
    id: number,
    last4: number,
    more: {
        card: {
            card_type: string,
            expiry_month: number,
            expiry_year: number,
            first6: number,
            issuer_country: string,
            last4: number,
        },
        id: string,
        saved: boolean,
        title: string,
        type: string,
    },
    payment_id: string,
    type: string,
    updated_at: string,
    user_id: number,
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

export type NewEmailDataType = {
    email: string,
    code: number,
}