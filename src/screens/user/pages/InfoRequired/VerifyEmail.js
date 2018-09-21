import React, {Component} from "react";
import { Text, Body, Button } from "native-base";
import {connect} from "react-redux";
import { signOut } from "store/actions/auth";

class VerifyEmail extends Component {
    render(){
        return (
            <Body>
                <Text>Verify Email</Text>
                <Button onPress={() => this.props.dispatchSignOut()}><Text>Logout</Text></Button>
            </Body>
        )
    }
}



const mapDispatchToProps = {
    dispatchSignOut: () => signOut(),
}

export default connect(null, mapDispatchToProps)(VerifyEmail)
