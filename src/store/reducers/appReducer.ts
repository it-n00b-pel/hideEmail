import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authApi, createAxiosInstance} from '../../api/mailHideApi';
import {v1} from 'uuid';
import {clearStorage, getDataRead, storeDataSave} from '../../utils';
import {fetchSubscription} from './subscriptionReducer';
import {fetchSecretEmailsList} from './secretsEmailsReducer';

export const fetchCode = createAsyncThunk('app/fetchCode', async (email: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await authApi.sendCode(email);
        thunkAPI.dispatch(setCode({isCode: true}));
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    }
    catch (e) {

    }
});

export const login = createAsyncThunk('app/authorizationUser', async (data: { email: string, password: string }, thunkAPI) => {
    const device_id = v1().substring(0, 8);
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const authorizationData = await authApi.authorization({email: data.email, device_id, code: +data.password});
        thunkAPI.dispatch(setCode({isCode: false}));
        await storeDataSave(authorizationData.data.token);
        await createAxiosInstance();
        await thunkAPI.dispatch(fetchSubscription());
        await thunkAPI.dispatch(fetchSecretEmailsList());
        thunkAPI.dispatch(setLogin({isLogin: true}));
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    }
    catch (e) {
        console.log(e);
    }
});

export const logOut = createAsyncThunk('app/logOut', async (arg, thunkAPI) => {
    await clearStorage();
    thunkAPI.dispatch(setLogin({isLogin: false}));
});

export const checkLoginUser = createAsyncThunk('app/checkLoginUser', async (arg, thunkAPI) => {
    let token = '';
    await getDataRead().then(res => token = res);
    if (token) {
        await createAxiosInstance();
        await thunkAPI.dispatch(fetchSubscription());
        await thunkAPI.dispatch(fetchSecretEmailsList());

        const id = setTimeout(() => {
            thunkAPI.dispatch(setLogin({isLogin: true}));
            thunkAPI.dispatch(setInitialized({isInitialized: true}));
        }, 2450);

        return () => {
            clearInterval(id);
        };
    } else {
        thunkAPI.dispatch(setInitialized({isInitialized: true}));
        thunkAPI.dispatch(setLogin({isLogin: false}));
    }
});

const slice = createSlice({
    name: 'app',
    initialState: {
        isLogin: false,
        isInitialized: false,
        isCode: false,
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        token: '',
    },
    reducers: {
        setPreloaderStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
        setError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setCode(state, action: PayloadAction<{ isCode: boolean }>) {
            state.isCode = action.payload.isCode;
        },
        setLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin;
        },
    },
});

export const appReducer = slice.reducer;
export const {setInitialized, setError, setPreloaderStatus, setCode, setLogin} = slice.actions;

export type LoginData = {
    email: string,
    code: number,
    device_id: string,
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'