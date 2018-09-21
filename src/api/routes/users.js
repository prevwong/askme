import firebase from "react-native-firebase";
import utils from "utils";
import DeviceInfo from 'react-native-device-info';


const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!!user == false) {
                console.log("NOT LOGGED IN")
                reject("Not logged in");
            } else {
                console.log("firebase", firebase.auth().currentUser)
                resolve(firebase.auth().currentUser);
            }
        });
    });
}

const verifyCurrentSession = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await firebase.auth().currentUser.reload();
            if ( firebase.auth().currentUser === null ) {
                reject("NOT LOGGED IN");
            } else {
                resolve();
            }
        } catch (err) {
            reject("NOT LOGGED IN");
        }
    });
}
const setUserMeta = ({uid}) => {
    return firebase.firestore().doc(`users/${uid}/meta/info`).set({
        created_at: new Date()
    });
}

const createUserWithEmail = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then(async (data) => {
            const user = data.user;
            await setUserMeta(user.uid);
            user.sendEmailVerification();
            resolve(user);
        }).catch(err => {
            reject(err);
        })
    });
}

const getUserInfo = async () => {
    return new Promise(async (resolve, reject) => {
        const id = firebase.auth().currentUser.uid;
        const user = await firebase.firestore().doc(`users/${id}/profile`).get();
        console.log("user data", user.data())
        if ( user.exists && Object.keys(user.data()).length > 0 ) {
            resolve(user);
        } else {
            reject("User has no info");
        }
    });
}


const updateDeviceToken = (token) => {
    const user = firebase.auth().currentUser.uid;
    const deviceId = DeviceInfo.getUniqueID();
    return new Promise(async (resolve, reject) => {
        await firebase.firestore().doc(`users/${user}`).get().then(async (doc) => {
            if (doc.exists) {
                let { devices } = doc.data();
                if (!devices) {
                    devices = { [deviceId]: token };
                    await firebase.firestore().doc(`users/${user}`).update({
                        devices
                    });
                } else {
                    if (devices[deviceId] !== token) {
                        await firebase.firestore().doc(`users/${user}`).update({
                            [`devices.${deviceId}`]: token
                        });
                    }
                }
                resolve({ deviceId: token });
            } else {
                console.log("doc exists not!");
                reject("user_non_existent")
            }
        });
    });
}

const manageRegistrationTokens = () => {
    return new Promise((resolve, reject) => {
        firebase.messaging().getToken().then(async (token) => {
            await updateDeviceToken(token);
            console.log("token", token);
            resolve(firebase.messaging().onTokenRefresh(async (fcmToken) => {
                console.log("token refresh", fcmToken);
                await updateDeviceToken(fcmToken);
            }));
        });
    });
}

const updateProfile = (data) => {
    var user = firebase.auth().currentUser;
    console.log("updating", `users/${user.uid}/meta/profile`);
    return firebase.firestore().doc(`users/${user.uid}/meta/profile`).get().then(doc =>{
        if ( doc.exists ) {
            firebase.firestore().doc(`users/${user.uid}/meta/profile`).update({
                ...data
            });
        } else {
            firebase.firestore().doc(`users/${user.uid}/meta/profile`).set({
                ...data
            });
        }
    })
}

export default {
    isSignedIn,
    verifyCurrentSession,
    createUserWithEmail,
    getUserInfo,
    manageRegistrationTokens,
    updateProfile,
    setUserMeta
}