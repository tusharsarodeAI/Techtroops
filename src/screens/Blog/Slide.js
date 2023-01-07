import firebase from "firebase";
import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../constant/color'

export default function Slide({ data }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    return (
        <View
            style={{
                width: windowWidth * 0.9, height: windowHeight * 0.8,
                backgroundColor: '#e8e8e8'
            }}
        >
            <View style={{ padding: 5, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "black" }}>
                {/* <Image
                    source={{ uri: user.profile_pic }}
                    style={{ width: 30, height: 30, borderRadius: 500 }}
                ></Image> */}

                <Text style={{ fontSize: 14, paddingLeft: 10 }}>{ }</Text>
            </View>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>{data.btitle}</Text>
            <ScrollView>
                {!!data.image && <Image
                    style={{
                        margin: 5,
                        height: 200,
                        width: 500,
                        resizeMode: 'contain',
                        alignSelf: "center"
                    }}
                    source={{
                        uri: data.image,
                    }}
                />}
                <Text style={{ fontSize: 18 }}>{data.bdetail}</Text>
            </ScrollView>
            {/* <Text style={{ fontSize: 18 }}> Uploded On {data.creation}</Text> */}
        </View>
    );
}