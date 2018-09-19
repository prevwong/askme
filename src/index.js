import React from 'react';
import { Alert } from 'react-native';

import { userNoPhone, logInSuccess, validateUser } from './store/actions/auth'
import { connect } from 'react-redux';
import { YellowBox } from 'react-native';
import api from "./api";
import { Spinner, Container, View } from 'native-base';
import screens from "./screens";
import firebase from "react-native-firebase";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {
    loaded = false
   
    notificationListener = null
    notificationDisplayedListener = null
    async componentDidMount() {
        this.loaded = true;
        api("users/isSignedIn").then(user => {
            api("users/manageRegistrationTokens").then((fn) => {
                this.token = fn;
            });
            this.checkNotifications();
            this.props.dispatchValidateUser();
        });
    }
    componentWillUnmount() {
        if (this.token) this.token();
        if (this.notificationListener) this.notificationListener();
        if (this.notificationDisplayedListener) this.notificationDisplayedListener();
    }
    async checkNotifications() {
        console.log("checking notifications")
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            const channel = new firebase.notifications.Android.Channel('remindus-channel', 'Remind-Us Channel', firebase.notifications.Android.Importance.Max)
                .setDescription('RemindUs notification channel');

            this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
                console.log("notification # received")
            });
            this.notificationListener = firebase.notifications().onNotification((notification) => {
                // Process your notification as required
                console.log("notification received!");
            });
        } else {
            console.log("no permission, requesting...")
            try {
                await firebase.messaging().requestPermission();
                this.checkNotifications();
            } catch (error) {
                // User has rejected permissions
                console.log("notification request error", error);
            }
        }
    }
    render() {
        let loggedIn = false;
        const { authenticated, isAuthenticating, error } = this.props.auth;
        const { user } = this.props.user;

        if (error) {
            Alert.alert("Error", error.message);
        }


        $render = (
            <View style={{ flex: 1 }}>
                <Container>
                    {user && <screens.user />}
                    {!user && this.loaded && <screens.auth />}
                </Container>
                {isAuthenticating &&
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: "center", position: "absolute", backgroundColor: "rgba(255,255,255,0.8)", height: "100%", width: "100%" }}>
                        <Spinner />
                    </View>
                }
            </View>
        )

        return $render;
    }
}



const mapDispatchToProps = {
    dispatchLogInSuccess: (user) => (dispatch) => dispatch(logInSuccess(user)),
    dispatchValidateUser: () => (dispatch) => dispatch(validateUser()),
    dispatchLogInNoPhone: () => (dispatch) => dispatch(userNoPhone())
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
