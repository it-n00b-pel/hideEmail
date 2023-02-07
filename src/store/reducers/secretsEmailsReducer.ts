import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CurrentSecretType, EmailType, SecretDataType, secretsApi, SecretType} from '../../api/mailHideApi';
import {logOut, setPreloaderStatus} from './appReducer';
import {handleServerNetworkError} from '../../utils/utils';
import {AxiosError} from 'axios';
import {AppDispatch} from '../store';

export const fetchSecretEmailsList = createAsyncThunk('secret/fetchSecretList', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const secret = await secretsApi.getSecretsEmails();
        thunkAPI.dispatch(generateNewSecretEmail());
        // thunkAPI.dispatch(fetchSimpleEmailList());
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        if (secret.data.secrets.length) {
            thunkAPI.dispatch(showInstruction());
        }
        return secret.data;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const generateNewSecretEmail = createAsyncThunk('secret/fetchSecretEmail', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const secretEmail = await secretsApi.generateEmail();
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return secretEmail.data;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const fetchSimpleEmailList = createAsyncThunk('secret/fetchSimpleEmailList', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const simpleEmail = await secretsApi.getSimpleEmailList();
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return simpleEmail;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const removeSecretEmail = createAsyncThunk('secre/removeSecretEmail', async (id: number, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await secretsApi.deleteSecretEmail(id);
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return id;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const addNewSecret = createAsyncThunk('secret/addNewSecret', async (data: SecretDataType, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        await secretsApi.addNewSecretEmail(data);
        thunkAPI.dispatch(fetchSecretEmailsList());
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        thunkAPI.dispatch(showInstruction());
        return 1;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

export const showSecretData = createAsyncThunk('secret/showSecretData', async (id: number, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const currentSecret = await secretsApi.getSecretEmailData(id);
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return currentSecret.data.secret;
    }
    catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch as AppDispatch);
    }
});

const slice = createSlice({
    name: 'secrets',
    initialState: {
        secretsList: [] as SecretType[],
        newEmail: {
            secretEmail: '',
        },
        emails: [] as EmailType[],
        currentSecret: {} as CurrentSecretType,
        isInstruction: true,
    },
    reducers: {
        showInstruction(state) {
            state.isInstruction = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSecretEmailsList.fulfilled, (state, action) => {
            if (action.payload) {
                state.secretsList = action.payload.secrets;
            }
        });
        builder.addCase(generateNewSecretEmail.fulfilled, (state, action) => {
            if (action.payload) {
                state.newEmail.secretEmail = action.payload.secret_email;
            }
        });
        builder.addCase(fetchSimpleEmailList.fulfilled, (state, action) => {
            if (action.payload) {
                state.emails = action.payload.data.emails;
            }
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.secretsList = [];
        });
        builder.addCase(showSecretData.fulfilled, (state, action) => {
            if (action.payload) state.currentSecret = action.payload;
        });
        builder.addCase(removeSecretEmail.fulfilled, (state, action) => {
            state.secretsList = state.secretsList.filter(s => s.id !== action.payload);
        });
    },
});

export const secretsEmailsReducer = slice.reducer;

export const {showInstruction} = slice.actions;