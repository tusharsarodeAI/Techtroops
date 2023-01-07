import React from 'react'
import firebase from 'firebase';
require('firebase/firestore')
require('firebase/firebase-storage')

export const UploadPost = (params) => {
    console.log(params)
    if (!params.image == "") {

        const uploadImage = async () => {
            const uri = params.image;
            const childpath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

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
                    console.log(params.caption)
                    SavePostData(snapshot, params.caption, params.profile.profile_pic, params.profile.username);
                })
            }
            const taskError = snapshot => {
                console.log(snapshot)
            }
            task.on("state_changed", taskProgress, taskError, taskCompleted);
        }

        function SavePostData(post_img, caption, profile_pic, username) {
            firebase
                .firestore()
                .collection('posts')
                .add(
                    {
                        user_id: firebase.auth().currentUser.uid,
                        post_img,
                        caption,
                        creation: firebase.firestore.FieldValue.serverTimestamp(),
                        profile_pic,
                        username
                    }
                )
                .then(function () {
                    console.log("Post uploaded")
                    params.navigation.navigate("Home")
                }
                )
        }
        uploadImage()
    }

}