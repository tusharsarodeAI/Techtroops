import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore')
require('firebase/firebase-storage')
import { fetchUser } from '../../redux/actions/index'
import { Store } from 'redux';
import { useStore } from 'react-redux';

export function SaveEditProfile(props) {
    console.log("Save edit Profiel Props :", props)
    const { bio, image, name, navigation, username, website } = props
    console.log("????????????")
    console.log(props)

    if (!image == "") {
        const uploadImage = async () => {
            const uri = image;
            const childpath = `profile/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

            const response = await fetch(uri);
            const blob = await response.blob();

            const task = firebase
                .storage()
                .ref()
                .child(childpath)
                .put(blob);
            console.log(task)
            const taskProgress = snapshot => {
                console.log(`Transferred : ${snapshot.bytesTransferred} Byets`)
            }
            const taskCompleted = () => {
                task.snapshot.ref.getDownloadURL().then((snapshot) => {
                    console.log(snapshot)
                    SavePostData(snapshot);
                })
            }
            const taskError = snapshot => {
                console.log(snapshot)
            }
            task.on("state_changed", taskProgress, taskError, taskCompleted);
        }

        const SavePostData = (profile_image) => {
            var ref = firebase.
                firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update(
                    {
                        profile_pic: profile_image,
                    }
                )
                .then(() => {
                    console.log("uploaded")
                }
                )
        }
        uploadImage()
    }

    if (!bio == "") {
        var ref = firebase.
            firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update(
                {
                    bio: bio,
                }
            )
            .then(() => {
                console.log(" Bio updated")
            }
            )
    }
    if (!name == "") {
        var ref = firebase.
            firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update(
                {
                    name: name,
                }
            )
            .then(() => {
                console.log(" Name updated")
            }
            )
    }
    if (!username == "") {
        var ref = firebase.
            firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update(
                {
                    username: username,
                }
            )
            .then(() => {
                console.log(" Username updated")
            }
            )
    }
    if (!website == "") {
        var ref = firebase.
            firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update(
                {
                    website: website,
                }
            )
            .then(() => {
                console.log(" Website updated")
            }
            )
    }
    navigation.goBack()
};

