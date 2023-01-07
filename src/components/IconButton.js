import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import color from '../constant/color';
export function IconButton({ name, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <MaterialCommunityIcons name={name} color={color.PRIMARY_COLOR} size={26} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
});