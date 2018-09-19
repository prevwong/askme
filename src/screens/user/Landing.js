import React, {Component} from "react";
import {connect} from "react-redux";
import api from "api";

class Landing extends Component {
    async componentDidMount(){
        const { authenticated } = this.props.auth;
        const { user } = this.props.user;

       
        if (authenticated && user && !user.emailVerified) {
            this.props.navigation.replace("VerifyEmail");
        } else {
            this.props.navigation.replace("Dashboard");
        }
        
        if ( authenticated ) {
            api("users/getUserInfo").catch(err => {
                this.props.navigation.navigate("GetUserInfo");
            })
        }
    }
    render() {
        return null;
    }
}


const mapDispatchToProps = {}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
