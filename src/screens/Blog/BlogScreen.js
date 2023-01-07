import React, { Component, useState } from 'react';
import { Linking, Modal, NativeModules, Platform, StatusBar, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Button, ScrollView, FlatList, TouchableOpacity, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase';
import Slide from './Slide';
const { StatusBarManager } = NativeModules;
//const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const STATUSBAR_HEIGHT = 20
export default class BlogScreen extends React.Component {
  componentDidMount() {
    firebase.firestore()
      .collectionGroup("Blogs")
      .get()
      .then((snapshot) => {
        let blogs = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
        })
        this.setState({ blogs: blogs })
      })
  }
  constructor(props) {
    super(props)
    this.state = {
      blogs: []
    }
  }
  render() {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

    return (
      <SafeAreaView>
        <View style={{ position: "relative" }}>

          <FlatList
            data={this.state.blogs}
            style={{ paddingTop: 20, width: windowWidth * 0.9, height: windowHeight * 0.8, alignSelf: "center" }}
            renderItem={({ item }) => {
              return <Slide data={item} />;
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Add Blog')}>
            <MaterialCommunityIcons style={{ flexDirection: "row", alignSelf: "flex-end", fontSize: 50 }} name="plus-circle" size={26} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    )
  }
}
