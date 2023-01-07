import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { Component, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Button } from 'react-native';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../../redux/actions/index'
class ProfileScreen extends Component {
    componentDidMount() {
        // this.timer = setInterval(() => this.props.fetchUser(), 5000)
        this.props.fetchUser()
        this.props.fetchUserPosts()
    }

    constructor(props) {
        super(props)
        this.state = {
            following_count: 0,
            following: this.props.following
        }
    }
    render() {
        const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
        if (this.props.profile == undefined || this.props.posts == undefined) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else {
            const { bio, email, name, profile_pic, username, website } = this.props.profile;

            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 20, paddingTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.openDrawer()}
                            >
                                <MaterialCommunityIcons name="format-list-bulleted-square" size={26} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit Profile')}>
                                <Text style={{ color: "blue", textTransform: "uppercase", fontWeight: "bold" }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
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
                            {this.props.following === undefined ?
                                <Title>0</Title> :
                                <Title>{this.state.following_count}</Title>
                            }
                            <Caption>Friends</Caption>
                        </View>
                    </View>

                    <View style={styles.menuWrapper}>
                        <FlatList
                            data={this.props.posts}
                            style={{ width: windowWidth * 0.9, height: windowHeight * 0.85, alignSelf: "center" }}
                            renderItem={({ item }) => {
                                return <Slide data={item} />;
                            }}
                        />
                    </View>
                </SafeAreaView>
            );
        }
    }
};

const mapStateToProps = (store) => ({
    profile: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(ProfileScreen)


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
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