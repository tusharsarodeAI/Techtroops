import { SearchBar } from 'react-native-elements';
import React, { Component, useEffect, useState } from 'react';
import { NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import { Avatar } from 'react-native-paper';
import firebase from 'firebase';

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: "",
            naviation: this.props.navigation
        }
    }
    render() {
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

        const fetchuser = (search) => {
            this.setState({ search: search })
            firebase.firestore()
                .collection('users')
                .where('username', '>=', search)
                .get()
                .then((snapshot) => {
                    let user = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    this.setState({ users: user })
                })
        }

        function Slide({ data, navigation }) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ShowProfile', { uid: data.id })}>
                    <View style={{ marginBottom: 10 }}>
                        <View
                            style={{
                                backgroundColor: '#e8e8e8',
                                flexDirection: "row"
                            }}
                        >
                            <View style={{ padding: 5, flexDirection: "column" }}>
                                <Avatar.Image
                                    source={{
                                        uri: data.profile_pic,
                                    }}
                                    size={50}
                                />
                            </View>
                            <View style={{ flexDirection: "column", }}>
                                <Text style={{ fontSize: 20, padding: 10, width: 130 }} >{data.username}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <SafeAreaView>
                <SearchBar
                    placeholder="Search User"
                    onChangeText={(search) => { fetchuser(search) }}
                    value={this.state.search}
                />
                <View style={{ position: "relative" }}>
                    <FlatList
                        data={this.state.users}
                        style={{ paddingTop: 20, width: windowWidth * 0.9, height: windowHeight * 0.8, alignSelf: "center" }}
                        renderItem={({ item }) => {
                            return <Slide data={item} navigation={this.state.naviation} />;
                        }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
