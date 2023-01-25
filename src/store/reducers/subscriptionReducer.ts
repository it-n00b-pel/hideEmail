import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType, EmailType, NewEmailDataType, subscriptionApi, SubscriptionResponseType} from '../../api/mailHideApi';
import {setPreloaderStatus} from './appReducer';
import {addNewSecret, removeSecretEmail} from './secretsEmailsReducer';
import {handleServerNetworkError} from '../../utils/utils';
import {AxiosError} from 'axios';
import {AppDispatch} from '../store';

const slice = createSlice({
    name: 'subscription',
    initialState: {
        subscription: {
            emails: [] as EmailType[],
            can_add_email: false,
            emails_total: 0,
            emails_used: 0,
            alias_total: 0,
            alias_used: 0,
            ended_at: '' as unknown as Date,
            cards: [] as CardType[],
            plans: [],
            self_plan: {},
        } as SubscriptionResponseType,
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
        builder.addCase(addNewSecret.fulfilled, (state) => {
            state.subscription.alias_used = state.subscription.alias_used + 1;
        });
    },
});

export const fetchSubscription = createAsyncThunk('subscription/fetchSubscription', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const subscription = await subscriptionApi.getSubscription();
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

export const addNewEmail = createAsyncThunk('subscription/addNewEmail', async (data: NewEmailDataType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await subscriptionApi.addNewEmail(data);
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    }
    catch (e) {

    }
});

export const subscriptionReducer = slice.reducer;
export const {setSubscription, setNewCode} = slice.actions;

export type SubscriptionActionCreatorsType = ReturnType<typeof setNewCode>