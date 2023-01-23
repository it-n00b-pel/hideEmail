import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionCreatorType, appReducer} from './reducers/appReducer';
import {SubscriptionActionCreatorsType, subscriptionReducer} from './reducers/subscriptionReducer';
import {secretsEmailsReducer} from './reducers/secretsEmailsReducer';

const rootReducer = combineReducers({
    app: appReducer,
    subscription: subscriptionReducer,
    secrets: secretsEmailsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(thunkMiddleware),
});

type AppActionsType = SubscriptionActionCreatorsType | AppActionCreatorType
export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;