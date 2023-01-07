import React from 'react';
import { StyleSheet, Text } from 'react-native';
import color from '../constant/color';
export function Heading({ children, style, ...props }) {
    return (
        <Text {...props} style={[styles.text, style, { color: color.TEXT_COLOR }]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
    },
});