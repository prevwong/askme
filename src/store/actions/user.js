import {
    SET_USER,
} from 'store/reducers/user';
import firebase from "react-native-firebase";

export function setUser() {
    console.log("SETTING USER");
    return {
        type: SET_USER,
        user: firebase.auth().currentUser
    }
}
