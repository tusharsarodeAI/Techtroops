import React, { Component, useState } from 'react';
import { Modal, NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';
const { StatusBarManager } = NativeModules;
//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const STATUSBAR_HEIGHT = 20

export default class IntDetail extends Component {
    componentDidMount() {
        firebase.firestore()
            .collection("internship")
            .doc(this.props.route.params.uid)
            .get()
            .then((snapshot) => {
                this.setState({ data: snapshot.data() })
            })
    }

    constructor(props) {
        super(props)
        this.state = {
            uid: this.props.route.params.uid,
            data: ''
        }
    }
    render() {
        console.log(this.state.data)
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
        return (

            <SafeAreaView>
                {this.state.data !== undefined ? (
                    <View style={{ paddingTop: 20, width: windowWidth * 0.9, height: windowHeight * 0.9, alignSelf: "center", backgroundColor: '#e8e8e8' }}>
                        <View>
                            <View style={{ padding: 5, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "black" }}>
                            </View>
                            <Text style={{ fontSize: 18, paddingBottom: 30 }}>
                                {this.state.data.ititle}
                            </Text>
                            <ScrollView>
                                <Text style={{ fontSize: 18 }}>
                                    {this.state.data.idesc}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>)
                    : (
                        <View></View>
                    )}
            </SafeAreaView>

        )
    }
}
