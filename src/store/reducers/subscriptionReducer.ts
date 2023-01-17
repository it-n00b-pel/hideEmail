import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EmailType, subscriptionApi, SubscriptionResponseType} from '../../api/mailHideApi';
import {setPreloaderStatus} from './appReducer';

const slice = createSlice({
    name: 'subscription',
    initialState: {
        emails: [] as EmailType[],
        can_add_email: false,
        emails_total: 0,
        emails_used: 0,
        alias_total: 0,
        alias_used: 0,
        ended_at: '' as unknown as Date,
        cards: [],
        plans: [],
        self_plan: {},
    } as SubscriptionResponseType,
    reducers: {
        setSubscription(state, action: PayloadAction<{ subscription: SubscriptionResponseType }>) {
            state = action.payload.subscription;
        },
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

    }
});

export const subscriptionReducer = slice.reducer;
export const {setSubscription} = slice.actions;