import React from 'react';
import { Alert } from 'react-native';

import { userNoPhone, logInSuccess, validateUser, signOut } from './store/actions/auth'
import { connect } from 'react-redux';
import { YellowBox } from 'react-native';
import api from "./api";
import { Spinner, Container, View } from 'native-base';
import screens from "./screens";
import firebase from "react-native-firebase";
import NavigatorService from 'utils/navigator';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {
    loaded = false
    userRef = null
    notificationListener = null
    notificationDisplayedListener = null
    state = {
        loaded: false
    }
    unmounted = false
    async componentDidMount() {
       
        api("users/isSignedIn").then(user => {
            api("users/verifyCurrentSession").catch(err => {
                console.log("verifying failed");
                this.props.dispatchSignOut();
            });
            if ( !this.unmounted ) this.setState({  loaded: true })
            api("users/manageRegistrationTokens").then((fn) => {
                this.token = fn;
            });
            this.checkNotifications();
            this.props.dispatchValidateUser();
        }).catch(err => {
            this.props.dispatchSignOut();
            if (!this.unmounted) this.setState({ loaded: true })
        })
    }
    componentWillUnmount() {
        this.unmounted = true;
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
    
    shouldComponentUpdate(nextProps){
        // if ( nextProps.auth.authenticated && this.props.user.user && this.state.loaded && !!this.props.user.user === !!nextProps.user.user) {
        //     return false;
        // }
        return true;
    }

    render() {
        let loggedIn = false;
        const { authenticated, error } = this.props.auth;
        const { user } = this.props.user;
        const {loading} = this.props.loader;

        console.log("recived rendr", !!user, authenticated);
        if (error) {
            Alert.alert("Error", error.message);
        }

        if ( !this.state.loaded ) {
            return null;
        }

        return <View style={{ flex: 1 }}>
            <Container>
                {user && <screens.UserLanding />}
                {!user && <screens.Auth />}
            </Container>
            {loading &&
                <View style={{ flexDirection: "column", flex: 1, justifyContent: "center", position: "absolute", backgroundColor: "rgba(255,255,255,0.8)", height: "100%", width: "100%" }}>
                    <Spinner />
                </View>
            }
        </View>;
    }
}



const mapDispatchToProps = {
    dispatchLogInSuccess: (user) => (dispatch) => dispatch(logInSuccess(user)),
    dispatchSignOut: (user) => (dispatch) => dispatch(signOut(user)),
    dispatchValidateUser: () => (dispatch) => dispatch(validateUser()),
    dispatchLogInNoPhone: () => (dispatch) => dispatch(userNoPhone())
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    loader: state.loader
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
