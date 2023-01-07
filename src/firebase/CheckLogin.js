import React from 'react';
import firebase from "firebase"
export default function CheckLogin(data) {

    console.log("Data :", data)
    const { email, password, navigation, setLoading, setError } = data;
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((results) => {
            console.log(results)
            navigation.navigate('Home')
        })
        .catch((error) => {
            if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                setError("No User Found");
                setLoading(false)
            }
            else if (error.message === "The email address is badly formatted.") {
                setError("Please Enter a valid E-mail")
                setLoading(false)
            }
            else {
                console.log(error)
                setLoading(false)
            }
        })
}