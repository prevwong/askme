import {
    SET_USER,
} from 'store/reducers/user';
import firebase from "react-native-firebase";

export function setUser(user) {
    return {
        type: SET_USER,
        user: user === null ? user : firebase.auth().currentUser
    }
}
