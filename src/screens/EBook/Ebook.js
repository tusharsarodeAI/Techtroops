import React, { Component, useEffect, useState } from 'react';
import { Modal, NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import color from '../../constant/color';
import firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import Slide from './Slide';

const { StatusBarManager } = NativeModules;
//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const STATUSBAR_HEIGHT = 20

export default class Ebooks extends Component {
    componentDidMount() {
        firebase.firestore()
            .collectionGroup("EBooks")
            .get()
            .then((snapshot) => {
                let books = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                this.setState({ books: books })
            })
    }
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            search: ""
        }
    }
    render() {
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

        const fetchBook = (search) => {
            this.setState({ search: search })
            firebase.firestore()
                .collection('EBooks')
                .where('bname', '>=', search)
                .get()
                .then((snapshot) => {
                    let books = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    this.setState({ books: books })
                })
        }

        return (
            <SafeAreaView>
                <SearchBar
                    placeholder="Search Book"
                    onChangeText={(search) => { fetchBook(search) }}
                    value={this.state.search}
                />
                <View style={{ position: "relative" }}>
                    <FlatList
                        data={this.state.books}
                        style={{ paddingTop: 20, width: windowWidth * 0.9, height: windowHeight * 0.8, alignSelf: "center" }}
                        renderItem={({ item }) => {
                            return <Slide data={item} />;
                        }}
                    />
                </View>
            </SafeAreaView>

        )
    }
}
