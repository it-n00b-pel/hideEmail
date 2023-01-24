import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useAppNavigation} from './types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {checkLoginUser} from '../../store/reducers/appReducer';
import AnimatedTyping from '../superComponents/AnimatedTyping';

const StartPage: React.FC = () => {
    const navigation = useAppNavigation();
    const dispatch = useAppDispatch();
    // const [sound, setSound] = useState<any>();
    const {isLogin, isInitialized} = useAppSelector(state => state.app);

    // async function playSound() {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync( require('../../assets/audio.mp3')
    //     );
    //     // setSound(sound);
    //     await sound.playAsync();
    // }

    useEffect(() => {
        // playSound()
             dispatch(checkLoginUser());
    }, []);

    useEffect(() => {
        if (isLogin && isInitialized) {
            navigation.navigate('HideMail');
        } else if (isInitialized && !isLogin) {
            navigation.navigate('Authorization');
        }
    }, [isLogin, isInitialized]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/image_processing20210911-8144-1jb2kfa.gif')}
                style={{width: 150, height: 150}}
            />
            <View>
                <AnimatedTyping text={['Mail Hide']}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StartPage;