import firebase from "firebase"
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, POSTS_STATE_CHANGE } from "../constants/index"

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                if (snapshot.exists) {
                    console.log("Snap shot data", snapshot.data())
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log("Does not work ")
                }
            })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection('posts')
            .where('user_id', '==', firebase.auth().currentUser.uid)
            .onSnapshot((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                console.log(posts)
                dispatch({ type: USER_POST_STATE_CHANGE, posts })
            })
    })
}

export function fetchPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .onSnapshot((snapshot) => {
                let allpost = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: POSTS_STATE_CHANGE, allpost })
            })
    })
}

export function fetchUserFollowing() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .onSnapshot((snapshot) => {
                let following = snapshot.docs.map(doc => {
                    console.log("---------------------------------------", doc.id)
                    const id = doc.id;
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following })
            })
    }
    )
}