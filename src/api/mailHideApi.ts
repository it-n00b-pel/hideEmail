import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {LoginData} from '../store/reducers/appReducer';

export let instance: AxiosInstance;

export async function createAxiosInstance(token: string) {
    // const token = await getDataRead('token');
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
    addNewSecretEmail(secretData: SecretDataType): Promise<AxiosResponse> {
        return instance.post('secrets', secretData);
    },
    getSecretEmailData(id: number): Promise<AxiosResponse<{ secret: CurrentSecretType }>> {
        return instance.get('secrets/' + id);
    },
    deleteSecretEmail(id: number): Promise<AxiosResponse> {
        return instance.delete('secrets/' + id);
    },
};

export const planApi = {
    getPlans(): Promise<AxiosResponse<{ plans: PlanType[] }>> {
        return instance.get('sub/plan');
    },
    getUrl(plan_id: number): Promise<AxiosResponse<{ redirect: string }>> {
        return instance.post('sub/plan', {plan_id, period: 'month'});
    },
};

export const supportApi = {
    postMessage(message: string): Promise<AxiosResponse<{ success: string }>> {
        return instance.post('support', {message});
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
    emails: EmailType[],
}

export type EmailType = {
    id: number,
    address: string,
    started_at: Date,
    ended_at: Date
}

export type SubscriptionResponseType = {
    can_add_email: boolean,
    emails_total: number,
    emails_used: number,
    alias_total: number,
    alias_used: number,
    ended_at: Date,
    cards: CardType[],
    self_plan: SelfPlanType
}

export type SelfPlanType = {
    title: string,
    description: string,
    price: number,
    priceYear: number,
    aliasCount: number,
    emailsCount: number,
    planId: number,
    priceByPeriod: number,
}

export type PlanType = {
    title: string,
    description: string,
    price: number,
    priceYear: number,
    aliasCount: number,
    emailsCount: number,
    planId: number,
    priceByPeriod: number
}

export type CardType = {
    id: number,
    user_id: number,
    type: string,
    first6: string,
    last4: number,
    expiry_month: number,
    expiry_year: number,
    card_type: string,
    more: {
        card: {
            last4: number,
            first6: number,
            card_type: string,
            expiry_year: number,
            expiry_month: number,
            issuer_country: string,
        },
        type: string,
        saved: boolean,
        title: string
    },
    created_at: Date,
    updated_at: Date,

}

// export type EmailType = {
//     id: number,
//     user_id: number,
//     address: string,
//     started_at: Date,
//     ended_at: Date,
//     created_at: Date,
//     updated_at: Date
// }

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