import React, {useEffect, useRef} from 'react';
import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from './Icons';
import * as Animatable from 'react-native-animatable';
import {TabArr} from '../HideEmail';


const TabButton = (props: { item: typeof TabArr[0]; onPress: (event: GestureResponderEvent) => void; accessibilityState: any; }) => {

    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef<{ animate: Function }>(null);
    const textViewRef = useRef<{ animate: Function }>(null);

    useEffect(() => {
        if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
            viewRef.current?.animate({0: {scale: 0}, 1: {scale: 1}});
            textViewRef.current?.animate({0: {scale: 0}, 1: {scale: 1}});
        } else {
            viewRef.current?.animate({0: {scale: 1}, 1: {scale: 0}});
            textViewRef.current?.animate({0: {scale: 1}, 1: {scale: 0}});
        }
    }, [focused]);
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, {flex: focused ? 1 : 0.65}]}>
            <View>
                <Animatable.View
                    // @ts-ignore
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject, {backgroundColor: item.color, borderRadius: 16}]}/>
                <View style={[styles.btn, {backgroundColor: focused ? undefined : item.alphaClr}]}>
                    <Icon type={item.type} name={item.icon} color={focused ? '#44D9E8' : '#fff'}/>
                    <Animatable.View
                        // @ts-ignore
                        ref={textViewRef}>
                        {focused && <Text style={{
                            color: 'white', paddingHorizontal: 8,
                        }}>{item.label}</Text>}
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#44D9E8',
        background: "rgba(47,28,28,0)",

        shadowColor: "#860488",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 16,

        shadowColor: "#860488",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
});

export default TabButton;