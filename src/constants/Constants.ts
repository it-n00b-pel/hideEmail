import * as Device from 'expo-device';

export const Colors = {
    primary: 'rgba(110,65,191,0.9)',
    primaryDark: 'rgba(24,8,48,0.44)',
    primaryLite: '#44D9E8',
};

// export const {width, height} = Dimensions.get('screen');

export const blurValue = Device.osName === 'Android'? 100 : 30;
