import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SecretDataType, secretsApi, SecretType} from '../../api/mailHideApi';
import {logOut, setPreloaderStatus} from './appReducer';

export const fetchSecretEmailsList = createAsyncThunk('secret/fetchSecretList', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const secret = await secretsApi.getSecretsEmails();
        thunkAPI.dispatch(generateNewSecretEmail());
        thunkAPI.dispatch(fetchSimpleEmailList());
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return secret.data;
    }
    catch (e) {

    }
});

export const generateNewSecretEmail = createAsyncThunk('secret/fetchSecretEmail', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
    const secretEmail = await secretsApi.generateEmail();
    thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    return secretEmail.data;
});

export const fetchSimpleEmailList = createAsyncThunk('secret/fetchSimpleEmailList', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
    const simpleEmail = await secretsApi.getSimpleEmailList();
    thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
    return simpleEmail;
});

export const addNewSecret = createAsyncThunk('secret/addNewSecret', async (data: SecretDataType, thunkAPI) => {
    thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
    await secretsApi.addNewSecretEmail(data);
    thunkAPI.dispatch(fetchSecretEmailsList());
    thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
});

const slice = createSlice({
    name: 'secrets',
    initialState: {
        secretsList: [] as SecretType[],
        newEmail: {
            secretEmail: '',
            emails: [] as Array<{ address: string }>,
        },
    },
    reducers: {},
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
                state.newEmail.emails = action.payload.data.emails;
            }
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.secretsList = [];
        });
    },
});

export const secretsEmailsReducer = slice.reducer;