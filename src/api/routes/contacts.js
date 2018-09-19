import firebase from "react-native-firebase";

const addNumber = ({ number }) => {
    const { displayName, photoURL } = firebase.auth().currentUser;
    const id = firebase.auth().currentUser.uid;
    firebase.firestore().collection("contacts").doc(number).set({
        id,
        displayName,
        photoURL
    });
}

export default {
    addNumber
}