import * as Device from 'expo-device';

export const Colors = {
    Primary: '#532e91',
    DimPrimary: '#522e8f',
    DarkPrimary: '#250d49',
    LightPrimary: '#815fc0',
    Dark: '#1A0931',
    Lite: '#44D9E8',
    DimLite: '#3791aa',
    Secondary: '#c7309c',
    Black: '#000',
    ShadowWhite: 'rgba(255,255,255,0.5)',
    White: '#fff',
    Success: '#3cf281',
    Danger:'#E44C55',
};

// export const {width, height} = Dimensions.get('screen');

export const blurValue = Device.osName === 'Android' ? 100 : 30;
