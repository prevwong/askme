import React, {Component} from "react";
import {connect} from "react-redux";

class Landing extends Component {
    componentDidMount(){
        const { user } = this.props.auth;
        if (!user.emailVerified) {
            this.props.navigation.replace("VerifyEmail");
        } else {
            this.props.navigation.replace("Dashboard");
        }
    }
    render() {
        return null;
    }
}


const mapDispatchToProps = {}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
