import React, {Component} from "react";
import {View} from "react-native";
import { Button, Text } from "native-base";
import { signOut } from "store/actions/auth";
import {connect} from "react-redux";

class Dashboard extends Component {
    render() {
        return (
            <View>
                <Text>Dashboard</Text>
                <Button onPress={()=>this.props.dispatchSignOut()}><Text>Logout</Text></Button>
            </View>
        )
    }
}


const mapDispatchToProps = {
    dispatchSignOut: () => signOut(),
}

export default connect(null, mapDispatchToProps)(Dashboard)
