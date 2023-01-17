import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataSave = async (value: string) => {
    try {
        await AsyncStorage.setItem('token', JSON.stringify(value));
    }
    catch (e) {
        // saving error
    }
};

export const getDataRead = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return await JSON.parse(value);
        }
    }
    catch (e) {
        // error reading value
    }
};

export const clearStorage  = async () => {
    try {
        await AsyncStorage.clear();
    }
    catch (e) {
        // error reading value
    }
};