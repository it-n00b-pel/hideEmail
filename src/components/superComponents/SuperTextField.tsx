import React, {useEffect, useRef, useState} from 'react';
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../../constants/Constants';

type Props = React.ComponentProps<typeof TextInput> & {
    label?: string
    errorText?: string | null
}

const SuperTextField: React.FC<Props> = (props) => {
    const {
        label,
        errorText,
        value,
        multiline,
        style,
        onBlur,
        onFocus,
        ...restOfProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 700,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start();
    }, [focusAnim, isFocused, value]);

    let color = isFocused ? Colors.Secondary : Colors.White;
    if (errorText) {
        color = Colors.Danger;
    }

    return (
        <View style={[style]}>
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: color,
                    },
                ]}
                multiline={!!multiline}
                ref={inputRef}
                {...restOfProps}
                value={value}
                onBlur={(event) => {
                    setIsFocused(false);
                    onBlur?.(event);
                }}
                autoFocus={props.autoFocus}
                onFocus={(event) => {
                    setIsFocused(true);
                    onFocus?.(event);
                }}
            />
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View
                    style={[styles.labelContainer, {
                        transform: [
                            {
                                scale: focusAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.75],
                                }),
                            },
                            {
                                translateY: focusAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [24, -20],
                                }),
                            },
                            {
                                translateX: focusAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [16, 0],
                                }),
                            },
                        ],
                    },
                    ]}
                >
                    <Text style={[styles.label, {color}]}>
                        {label}
                        {/*{errorText ? '*' : ''}*/}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 15,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: 22,
        color: Colors.White,
        backgroundColor: Colors.Primary,
    },
    labelContainer: {
        position: 'absolute',
    },
    label: {
        fontSize: 12,
    },
    error: {
        marginTop: 4,
        marginLeft: 12,
        fontSize: 12,
        color: Colors.Danger,
    },
});

export default SuperTextField;