import {
    SET_USER,
    SET_INFO
} from 'store/reducers/user';
import firebase from "react-native-firebase";

export function setUser(user) {
    return {
        type: SET_USER,
        user: user === null ? user : firebase.auth().currentUser
    }
}
export function setInfo(info) {
    return {
        type: SET_INFO,
        info
    }
}
