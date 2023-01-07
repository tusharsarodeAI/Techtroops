import React, { Component, useState } from 'react';
import { Modal, NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';

const { StatusBarManager } = NativeModules;
//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const STATUSBAR_HEIGHT = 20

export default class OppAlert extends Component {
    componentDidMount() {
        firebase.firestore()
            .collectionGroup("competition")
            .get()
            .then((snapshot) => {
                let comp = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                this.setState({ comp: comp })
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            comp: []
        }
    }
    render() {
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

        return (
            <SafeAreaView>
                <View style={{ height: windowHeight * 0.10, paddingTop: STATUSBAR_HEIGHT }}>
                    <Text style={{ fontSize: 30, alignSelf: "center" }}>Compitions</Text>
                </View>
                <FlatList
                    data={this.state.comp}
                    style={{ width: windowWidth * 0.9, height: windowHeight * 0.85, alignSelf: "center" }}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: windowWidth * 0.8, height: windowHeight * 0.3,
                                    backgroundColor: '#e8e8e8',
                                    padding: 5,
                                    borderRadius: 10,
                                    margin: 20,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    alignSelf: "center"
                                }}
                            >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Opp Detail", { uid: item.id })}>
                                    <View>
                                        <Text style={{ fontSize: 24, paddingBottom: 10 }}>{item.ctitle}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </SafeAreaView>

        )
    }
}
