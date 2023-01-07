import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../constant/color'
import * as OpenAnything from 'react-native-openanything'
export default function Slide({ data }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const source = data.book
    return (
        <View>
            <View
                style={{
                    backgroundColor: '#e8e8e8',
                    flexDirection: "row"
                }}
            >
                <View style={{ padding: 5, flexDirection: "column" }}>
                    <Image
                        source={{ uri: data.cover_photo }}
                        style={{ width: 120, height: 180, }}
                    ></Image>
                </View>
                <View style={{ flexDirection: "column", }}>
                    <Text style={{ fontSize: 20, padding: 10, width: 200 }} >{data.bname}</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", paddingTop: 10, width: 130 }} >Author :-</Text>
                    <Text style={{ fontSize: 15, width: 180 }} >{data.bauth}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 20, alignSelf: "center" }}>
                <TouchableOpacity
                    onPress={() => OpenAnything.Pdf(data.book)}
                    style={{
                        backgroundColor: color.PRIMARY_COLOR, borderRadius: 5, height: 30, width: windowWidth * 0.7, alignSelf: "center"
                    }}
                >
                    <Text style={{ color: "white", textTransform: "uppercase", alignSelf: "center", alignContent: "center" }}>Download Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}