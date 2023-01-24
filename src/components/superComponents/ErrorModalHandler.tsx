import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {MaterialIcons} from '@expo/vector-icons';
import {BlurView} from 'expo-blur';
import {logOut, setError} from '../../store/reducers/appReducer';
import {useAppNavigation} from '../screen/types';
import {blurValue} from '../../constants/Constants';

const ErrorModalHandler: React.FC = () => {
    const error = useAppSelector(state => state.app.error);
    const dispatch = useAppDispatch();
    const navigation = useAppNavigation();

    console.log(error);

    const closeHandler = () => {
        dispatch(setError({error: {message: null, status: null}}));
    };
    useEffect(() => {
        if (error.status === 401) {
            dispatch(logOut());
            navigation.navigate('Authorization');
        }
    }, [error]);

    return (
        <View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={!!error.status}
                    // onRequestClose={() => {
                    //     Alert.alert('Modal has been closed.');
                    // }}
                >
                    <BlurView intensity={blurValue} tint={'dark'} style={[styles.blur]}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.header}>
                                    <MaterialIcons name="error" size={36} color="white"/>
                                    <Text style={styles.headerText}> Error</Text>
                                    <TouchableOpacity onPress={() => closeHandler()}>
                                        <MaterialIcons name="close" size={32} color="#fff"/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.textStyle}>{error.message}</Text>

                                {/*<View*/}
                                {/*    style={{*/}
                                {/*        borderTopColor: '#d52f2f',*/}
                                {/*        borderBottomWidth: StyleSheet.hairlineWidth,*/}
                                {/*        borderTopWidth: 1,*/}
                                {/*        marginHorizontal: 0,*/}
                                {/*    }}*/}
                                {/*/>*/}
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
                                    <TouchableOpacity
                                        style={[styles.button]}
                                        onPress={() => closeHandler()}>
                                        <Text style={[styles.textStyle, {color: '#fff', textAlign: 'center'}]}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </BlurView>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    blur: {
        flex: 1,
    },
    modalView: {
        width: 280,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#d52f2f',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 5,

    },
    header: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E44C55',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
    },
    button: {
        width: 70,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#888888',
        backgroundColor: 'rgba(155,155,155,0.38)',
    },
    textStyle: {
        textAlign: 'center',
        padding: 10,
        color: '#d52f2f',
    },
});

export default ErrorModalHandler;