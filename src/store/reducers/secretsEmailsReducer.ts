import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {secretsApi, SecretType} from '../../api/mailHideApi';
import {setPreloaderStatus} from './appReducer';

export const fetchSecretList = createAsyncThunk('secret/fetchSecretList', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setPreloaderStatus({status: 'loading'}));
        const secret = await secretsApi.getSecretsEmails();
        thunkAPI.dispatch(setPreloaderStatus({status: 'succeeded'}));
        return secret.data;
    }
    catch (e) {

    }
});

const slice = createSlice({
    name: 'secrets',
    initialState: {
        secretsList: [] as SecretType[],
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSecretList.fulfilled, (state, action) => {
            if (action.payload) {
                state.secretsList = action.payload.secrets;
            }
        });
    },
});

export const secretsEmailsReducer = slice.reducer;