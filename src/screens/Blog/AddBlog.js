import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, TextInput, ScrollView } from "react-native";
import { Input } from '../../components/Input';
import { FilledButton } from "../../components/FilledButton";
import { UploadBlog } from "./UploadBlog";
import { connect } from 'react-redux';

class AddBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            detail: '',
            website: '',
            navigation: this.props.navigation,
            profile: this.props.profile
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ paddingHorizontal: 25, paddingBottom: 200 }}>
                        <Input
                            style={styles.input}
                            placeholder={'Title'}
                            value={this.state.title}
                            onChangeText={(title) => this.setState({ title: title })}
                        />
                        <View style={styles.textAreaContainer} >
                            <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Type something"
                                numberOfLines={20}
                                multiline={true}
                                value={this.state.detail}
                                onChangeText={(detail) => this.setState({ detail: detail })}
                            />
                        </View>
                        <Input
                            style={styles.input}
                            placeholder={'Website'}
                            value={this.state.website}
                            onChangeText={(website) => this.setState({ name: website })}
                        />
                        <FilledButton
                            onPress={() => UploadBlog(this.state)}
                            title={'ADD BLOG'}
                            style={styles.loginButton}
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
        paddingTop: 10
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
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
    textAreaContainer: {
        backgroundColor: '#e8e8e8',
        width: '100%',
        height: '70%',
        padding: 20,
        borderRadius: 8,
        color: 'black',
    },
    textArea: {
        justifyContent: "flex-start"
    }

});
const mapStateToProps = (store) => ({
    profile: store.userState.currentUser,
})
export default connect(mapStateToProps, null)(AddBlog)
// export defau;lt AddBlog