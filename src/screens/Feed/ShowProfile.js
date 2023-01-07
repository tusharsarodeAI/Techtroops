import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { Component, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,

} from 'react-native-paper';
import { Loading } from '../../components/Loding';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../../constant/color';
import Slide from './Slide';
import firebase from 'firebase';
require('firebase/firestore')
import { connect } from 'react-redux';

class ShowProfile extends Component {
    componentDidMount() {
        firebase.firestore()
            .collection("users")
            .doc(this.props.route.params.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    console.log("Snap shot data", snapshot.data())
                    this.setState({ profile: snapshot.data() })
                }
                else {
                    console.log("Does not work ")
                }
            })

        firebase.firestore()
            .collection('posts')
            .where('user_id', '==', this.props.route.params.uid)
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                this.setState({ posts: posts })
            })
    }
    constructor(props) {
        super(props)
        this.state = {
            profile: "",
            posts: [],
            following: false,
            naviation: this.props.navigation
        }
    }
    render() {
        console.log(this.props.route.params.uid)
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

        this.props.following.map(data => {
            console.log(data, "=", this.props.route.params.uid)
            if (data.id === this.props.route.params.uid) {
                console.log("....................}}}}}}}}}}}}}}}}}}}}}")
                this.setState({ following: true })
            }
        })

        const onfollow = () => {
            firebase.firestore()
                .collection("following")
                .doc(firebase.auth().currentUser.uid)
                .collection("userFollowing")
                .doc(this.props.route.params.uid)
                .set({
                })
        }
        const onunfollow = () => {
            firebase.firestore()
                .collection("following")
                .doc(firebase.auth().currentUser.uid)
                .collection("userFollowing")
                .doc(this.props.route.params.uid)
                .delete()
        }
        if (this.state.profile == undefined || this.state.posts == undefined) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else {
            const { bio, email, name, profile_pic, username, website } = this.state.profile;
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={{
                                        uri: profile_pic,
                                    }}
                                    size={80}
                                />
                                <View style={{ marginLeft: 20 }}>
                                    <Title style={[styles.title, {
                                        marginTop: 15,
                                        marginBottom: 5,
                                    }]}>{name}</Title>
                                    <Caption style={styles.caption}>{username}</Caption>
                                </View>
                            </View>
                        </View>

                        <View style={styles.userInfoSection}>
                            <View style={styles.row}>
                                <Icon name="bio" color="#777777" size={20} />
                                <Text style={{ color: "#777777", marginLeft: 20 }}>{bio}</Text>
                            </View>
                            {/* <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}></Text>
                </View> */}
                            <View style={styles.row}>
                                <Icon name="earth" color="#777777" size={20} />
                                <Text style={{ color: "#777777", marginLeft: 20 }}>{website}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox, {
                                borderRightColor: '#dddddd',
                                borderRightWidth: 1
                            }]}>
                                {this.state.following ?
                                    <Button title="Friends"
                                        onPress={() => onunfollow()}
                                    />
                                    :
                                    <Button title="Add Friend"
                                        onPress={() => onfollow()}
                                    />
                                }
                            </View>
                        </View>

                        <View style={styles.menuWrapper}>
                            <FlatList
                                data={this.state.posts}
                                style={{ width: windowWidth * 0.9, height: windowHeight * 0.85, alignSelf: "center" }}
                                renderItem={({ item }) => {
                                    return <Slide data={item} />;
                                }}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
};

const mapStateToProps = (store) => ({
    following: store.userState.following
})
export default connect(mapStateToProps, null)(ShowProfile)
// export default ShowProfile

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 70,
    },
    infoBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});