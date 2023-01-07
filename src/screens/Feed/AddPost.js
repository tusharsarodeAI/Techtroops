import React, { Component, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, ScrollView, Platform } from "react-native";
import { Input } from '../../components/Input';
import { FilledButton } from "../../components/FilledButton";
import * as ImagePicker from 'expo-image-picker';
import color from "../../constant/color";
import { Error } from '../../components/Error';
import { UploadPost } from "./UploadPost";
import { connect } from "react-redux";

class AddPost extends Component {
    componentDidMount() {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            caption: '',
            error: '',
            profile: this.props.profile,
            navigation: this.props.navigation
        }
        console.log(props)
    }

    render() {
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        }
        return (
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={styles.pic}>
                        {!!this.state.image && <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: this.state.image,
                            }}
                        />}
                        <Button title="Choose Image"
                            onPress={pickImage}
                            color={color.PRIMARY_COLOR}
                        />
                    </View>
                    <Error error={this.state.error} />
                    <Input
                        style={styles.input}
                        placeholder={'Add Caption'}
                        value={this.state.caption}
                        onChangeText={(title) => this.setState({ caption: title })}
                    />
                    <FilledButton
                        title={'ADD POST'}
                        style={styles.loginButton}
                        onPress={() => {
                            if (this.state.image == "") {
                                this.setState({ error: "Image Must Be Selected !!" })
                            }
                            else {
                                this.setState({ image: "" })
                                UploadPost(this.state);
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
};
const mapStateToProps = (store) => ({
    profile: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(AddPost)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
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
        height: 300,
        width: 500,
    }
});
