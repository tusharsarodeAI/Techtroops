import React, { Component, useState } from 'react';
import { Modal, NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const STATUSBAR_HEIGHT = 20
import Slide from './Slide';
import firebase from 'firebase'

export default class JobAlert extends Component {
    componentDidMount() {
        firebase.firestore()
            .collectionGroup("jobs")
            .get()
            .then((snapshot) => {
                let jobs = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                this.setState({ jobs: jobs })
            })
    }
    constructor(props) {
        super(props)
        this.state = {
            jobs: []
        }
    }
    render() {
        const navigation = this.props.navigation;
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
        console.log(navigation)

        return (
            <SafeAreaView>
                <View style={{ height: windowHeight * 0.10, paddingTop: STATUSBAR_HEIGHT }}>
                    <Text style={{ fontSize: 30, alignSelf: "center" }}>JOB</Text>
                </View>

                <FlatList
                    data={this.state.jobs}
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
                                <TouchableOpacity onPress={() => navigation.navigate("Job Detail", { uid: item.id })}>
                                    <View>
                                        <Text style={{ fontSize: 24, paddingBottom: 10 }}>{item.jtitle}</Text>
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
