import React from 'react';
import { Alert } from 'react-native';

import { userNoPhone, logInSuccess } from 'store/actions/auth'
import { connect } from 'react-redux';
import screens from 'screens';
import { YellowBox } from 'react-native';
import api from "api";
import firebase from "react-native-firebase";
import { Spinner, Container, View } from 'native-base';

console.log(screens.auth);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends React.Component {
    loaded = false
    state = {
        user: null,
    }
    notificationListener = null
    notificationDisplayedListener = null
    async componentDidMount() {

        try {
            const user = await api("users/isSignedIn");
            // api("users/manageRegistrationTokens");
            this.loaded = true;
            // api("notifications/checkNotifications").then((onNotificationDisplayed, onNotification) => {
            //     console.log("NOTIFICATION", onNotificationDisplayed, onNotification)
            // });
            this.props.dispatchLogInSuccess(user);
        } catch (err) {
            this.loaded = true;
            this.setState({ isLoading: false })
        }
    }
    componentWillUnmount() {
        if (this.token) this.token();
        if (this.notificationListener) this.notificationListener();
        if (this.notificationDisplayedListener) this.notificationDisplayedListener();
    }
    componentDidUpdate(){

    }
    render() {
        let loggedIn = false;
        const { user, isAuthenticating, error } = this.props.auth;
        
        if ( error ) {
            Alert.alert("Error", error.message);
        }

        $render = (
            <View style={{flex:1}}>
                <Container>
                    { user && <screens.user /> }
                    { !user && this.loaded && <screens.auth /> } 
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
    dispatchLogInNoPhone: () => (dispatch) => dispatch(userNoPhone())
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
