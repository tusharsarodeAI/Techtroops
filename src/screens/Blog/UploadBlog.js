import React from 'react'
import firebase from 'firebase';
require('firebase/firestore')
require('firebase/firebase-storage')

export function UploadBlog(params) {
    console.log(params)
    const { detail, navigation, profile, title, website } = params;
    firebase
        .firestore()
        .collection('Blogs')
        .add(
            {
                user_id: firebase.auth().currentUser.uid,
                uname: profile.username,
                pic: profile.profile_pic,
                btitle: title,
                bdetail: detail,
                bwebsite: website,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        .then(() => {
            console.log("Blog uploaded")
            navigation.goBack()
        }
        )
}
