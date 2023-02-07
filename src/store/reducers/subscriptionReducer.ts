import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType, NewEmailDataType, planApi, PlanType, subscriptionApi, SubscriptionResponseType, supportApi} from '../../api/mailHideApi';
import {setPreloaderStatus} from './appReducer';
import {addNewSecret, fetchSimpleEmailList, removeSecretEmail} from './secretsEmailsReducer';
import {handleServerNetworkError} from '../../utils/utils';
import {AxiosError} from 'axios';
import {AppDispatch} from '../store';
import {Alert} from 'react-native';

const slice = createSlice({
    name: 'subscription',
    initialState: {
        subscription: {
            can_add_email: false,
            emails_total: 0,
            emails_used: 0,
            alias_total: 0,
            alias_used: 0,
            ended_at: '' as unknown as Date,
            cards: [] as CardType[],
            self_plan: {
                title: '',
                description: '',
                price: 0,
                priceYear: 0,
                aliasCount: 0,
                emailsCount: 0,
                planId: 0,
                priceByPeriod: 0,
            },
        } as SubscriptionResponseType,
        plans: [] as PlanType[],
        hasCode: false,
    },
    reducers: {
        setSubscription(state, action: PayloadAction<{ subscription: SubscriptionResponseType }>) {
            state.subscription = action.payload.subscription;
        },
        setNewCode(state, action: PayloadAction<{ hasCode: boolean }>) {
            state.hasCode = action.payload.hasCode;
        },
    },
    extraReducers(builder) {
        builder.addCase(removeSecretEmail.fulfilled, (state) => {
            state.subscription.alias_used = state.subscription.alias_used - 1;
        });
        builder.addCase(addNewSecret.fulfilled, (state, action) => {
         if (action.payload)   {
                state.subscription.alias_used = state.subscription.alias_used + action.payload;
            }
        });
        builder.addCase(fetchPlans.fulfilled, (state, action) => {
            if (action.payload) {
                state.plans = action.payload.data.plans;
            }
        });
        builder.addCase(addNewEmail.fulfilled, state => {
            state.subscription.emails_used = state.subscription.alias_used + 1;
        });

    },
});

export const fetchSubscription = createAsyncThunk('subscription/fetchSubscription', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const subscription = await subscriptionApi.getSubscription();
        await thunkAPI.dispatch(fetchPlans());
        thunkAPI.dispatch(setSubscription({subscription: subscription.data}));
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const fetchVerifyCode = createAsyncThunk('subscription/fetchVerifyCode', async (email: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await subscriptionApi.getVerifyCode(email);
        thunkAPI.dispatch(setNewCode({hasCode: true}));
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const fetchPlans = createAsyncThunk('subscription/getPlans', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const plans = await planApi.getPlans();
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return plans;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const fetchUrlForPay = createAsyncThunk('subscription/fetchUrlForPay', async (plan_id: number, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const url = await planApi.getUrl(plan_id);
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return url.data.redirect;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const addNewEmail = createAsyncThunk('subscription/addNewEmail', async (data: NewEmailDataType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await subscriptionApi.addNewEmail(data);
        await thunkAPI.dispatch(fetchSimpleEmailList());
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        Alert.alert('', `Email was added`, [
            {text: 'Ok', style: 'cancel'}]);
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const sendMessage = createAsyncThunk('support/sendMessage', async (message: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const res = await supportApi.postMessage(message);
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        Alert.alert('', `${res.data.success}`, [
            {text: 'Ok', style: 'cancel'}]);
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const subscriptionReducer = slice.reducer;
export const {setSubscription, setNewCode} = slice.actions;

export type SubscriptionActionCreatorsType = ReturnType<typeof setNewCode>