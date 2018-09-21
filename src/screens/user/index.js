import React, {Component} from "react";
import {connect} from "react-redux";
import api from "api";
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import { setInfo } from "store/actions/user";
import { signOut } from "store/actions/auth";

import firebase from "react-native-firebase";
import { expandRoutesToStack } from "../../utils";
import routes from "./routes";

const RequireInfoPages = createStackNavigator({
    GetUserInfo: { screen: require("./pages/InfoRequired/GetUserInfo").default, },
}, {
    drawerWidth: 300
})


const DrawerRoutes = expandRoutesToStack(routes, createStackNavigator);
const UserPages = createStackNavigator({
    Drawer: {
        name: 'Drawer',
        screen: createDrawerNavigator(
            DrawerRoutes,
            {contentComponent: require("../../components/Sidebar").default,
            drawerWidth: 350}
        ),
    },
    ...routes
},
    {
        headerMode: 'none'
    }
);


class Landing extends Component {
    state = {
        requireInfo: false
    }
    user = firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`);
    profile = firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/meta/profile`);
    static navigationOptions = { header:null }
    async componentDidMount(props){
        console.log("mounte", `users/${firebase.auth().currentUser.uid}/meta/profile`)
        this.userUnsubscribe = this.user.onSnapshot(this.onUserUpdate.bind(this));
        this.profileUnsubscribe = this.profile.onSnapshot(this.onProfileUpdate.bind(this));
        // this.props.dispatchSetInfo(null);
    }
    async onUserUpdate(doc) {
        if ( !doc.exists ) {
            this.props.dispatchSignOut();
        }
        console.log("onUserupdate", `users/${firebase.auth().currentUser.uid}`);
    }
    async onProfileUpdate(doc) {
        console.log("on update...dispatching")
        this.props.dispatchSetInfo(doc.data());
    }
    componentWillUnmount() {
        this.userUnsubscribe();
        this.profileUnsubscribe();
    }
    render() {
        
        const {info} = this.props.user;
        console.log("REQUIRED INFO", !!info);
        return (
            !info ? (
                <RequireInfoPages onComplete={() => {
                    console.log("COMPLETED")
                }} />
            ) : (
                <UserPages />
            )
        );
    }
}


const mapDispatchToProps = {
    dispatchSetInfo: (info) => setInfo(info),
    dispatchSignOut: () => signOut(),
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
