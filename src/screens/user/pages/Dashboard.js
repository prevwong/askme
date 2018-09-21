import React, {Component} from "react";
import {View} from "react-native";
import { Button, Text } from "native-base";
import { signOut } from "store/actions/auth";
import {connect} from "react-redux";
import AppHeader from "components/AppHeader";

class Dashboard extends Component {
    static navigationOptions = {header:null}
    render() {
        console.log("DASHBOARD-RENDER");
        const { authenticated} = this.props.auth;
        return (
            <AppHeader {...this.props}>
                <View>
                    <Text>Dashboard</Text>
                    <Text>Authenticated: {authenticated ? "Authenticated" : "Not"}</Text>
                    <Button onPress={()=>this.props.dispatchSignOut()}><Text>Logout</Text></Button>
                </View>
            </AppHeader>
        )
    }
}


const mapDispatchToProps = {
    dispatchSignOut: () => signOut(),
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
