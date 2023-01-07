import firebase from "firebase"

export default function CreateUser(data) {
    console.log("I Create User")
    const { email, username, name, password, setError, setLoading, navigation } = data;
    console.log(data)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((results) => {
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set(
                    {
                        profile_pic: "https://image.flaticon.com/icons/png/512/149/149071.png",
                        email: email,
                        username: username,
                        name: name,
                        bio: "",
                        website: "",
                    }
                )
            console.log(results)
            navigation.navigate('Login')
        })
        .catch((error) => {
            console.log(error.message)
            setError(error.message)
            setLoading(false)
        })
}