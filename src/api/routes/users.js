import firebase from "react-native-firebase";
import utils from "utils";

const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!!user == false) {
                reject("Not logged in");
            } else {
                await firebase.auth().currentUser.reload();
                resolve(firebase.auth().currentUser);
            }
        });
    });
}

const createUserWithEmail = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then(async (data) => {
            const user = data.user;
            await firebase.firestore().collection("users").doc(user.uid).set({
                email,
                created_at: new Date()
            });
            user.sendEmailVerification();
            resolve(user);
        }).catch(err => {
            reject(err);
        })
    });
}


export default {
    isSignedIn,
    createUserWithEmail
}