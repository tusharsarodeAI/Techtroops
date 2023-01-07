
import React from 'react';
import { Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../constant/color'

export default function Slide({ data }) {
    console.log(data)
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
    return (
        <View
            style={{
                width: windowWidth * 0.8, height: windowHeight * 0.4,
                backgroundColor: '#e8e8e8',
                padding: 5,
                borderRadius: 10,
                margin: 15,
                borderWidth: 1,
                borderColor: "black",
                alignSelf: "center",
                flexDirection: "column",
            }}
        >
            <View style={{ flexDirection: "column" }}>
                <View style={{ padding: 5, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "black" }}>
                    <Image
                        source={{ uri: data.profile_pic }}
                        style={{ width: 30, height: 30, borderRadius: 500 }}
                    ></Image>
                    <Text style={{ fontSize: 14, paddingLeft: 10 }}>{data.username}</Text>
                </View>
                <Image
                    source={{ uri: data.post_img }}
                    style={{ width: '100%', height: '70%', borderRadius: 5 }}
                ></Image>
                <Text style={{ fontSize: 14, padding: 10 }}>{data.caption}</Text>
            </View>
        </View>
    );
}