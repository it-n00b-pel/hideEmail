import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import MailHide from './src/components/MailHide';
import {LogBox} from 'react-native';

export default function App() {
     LogBox.ignoreAllLogs(true);
    return (
        <Provider store={store}>
            <MailHide/>
            {/*<AnimatedLottieView source={require('./src/assets/img/eye.json')} style={{backgroundColor: "#123123"}} autoPlay loop />*/}
        </Provider>
    );
}
