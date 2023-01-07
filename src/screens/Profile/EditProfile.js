import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, TextInput, ScrollView } from "react-native";
import GetImage from './GetImage';
import { Input } from '../../components/Input';
import { FilledButton } from "../../components/FilledButton";
import { SaveEditProfile } from "./SaveEditProfile";

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            username: '',
            name: '',
            bio: '',
            website: '',
            navigation: props.navigation,
        }
        this.setimage = this.setimage.bind(this);
        console.log(this.state)
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(this.props.route)
        console.log("---------------------------")
    }
    setimage(img) {
        this.setState({ image: img })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <GetImage setimage={this.setimage} />
                    <View style={{ paddingHorizontal: 25 }}>
                        {/* <Input
                            style={styles.input}
                            placeholder={'Email'}
                            keyboardType={'email-address'}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email: email })}
                        /> */}
                        <Input
                            style={styles.input}
                            placeholder={'Username'}
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username: username })}
                        />
                        <Input
                            style={styles.input}
                            placeholder={'Name'}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name: name })}
                        />
                        <Input
                            style={styles.input}
                            placeholder={'Bio'}
                            value={this.state.bio}
                            onChangeText={(bio) => this.setState({ bio: bio })}
                        />
                        <Input
                            style={styles.input}
                            placeholder={'Website'}
                            value={this.state.website}
                            onChangeText={(website) => this.setState({ name: website })}
                        />
                        <FilledButton
                            title={'Save Change'}
                            style={styles.loginButton}
                            onPress={
                                () => {
                                    SaveEditProfile(this.state)
                                }
                            }
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
    pic: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    tinyLogo: {
        margin: 5,
        height: 100,
        width: 100,
    },
    data: {
        marginLeft: 50
    },
    inp: {
        marginBottom: 10,
        borderBottomWidth: 0.5,
        width: 250,
        fontSize: 15,
        alignSelf: "center",
    },

});

export default EditProfile;