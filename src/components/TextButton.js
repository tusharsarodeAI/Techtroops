import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import color from '../constant/color';
export function TextButton({ title, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={[styles.text, { color: color.PRIMARY_COLOR }]}>
                {title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontWeight: '500',
        fontSize: 14,
    },
});