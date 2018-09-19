import React, {Component} from "react";
import { Container, Content, Title, Text, Form, Item, Input, Body, Button, View } from "native-base";
import api from "api";
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
class VerifyPhone extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        code: '123456'
    }
    componentDidMount(){
        this.setState({
            code: this.props.code
        });
    }
    verify() {
        return this.props.onSuccess();
        const { verificationId, phone } = this.props;
        const { code } = this.state;
        const { user } = this.props.user;
        var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
        user.linkAndRetrieveDataWithCredential(credential).then(async (res) => {
           this.props.onSuccess();
        }).catch(err => {
            console.log("link error!");
        });
    }
    render(){
        const {code} = this.state;
        return (
            <View style={{ height: 300, backgroundColor:"#fff", paddingTop: 50 }}>
                <Title><Text style={{ fontSize: 30 }}>Verify Phone Number</Text></Title>
                <Title style={{ marginBottom: 20 }}><Text>We've sent a code to your phone</Text></Title>
                <Form>
                    <Item fixedLabel>
                        <Input value={code} onChangeText={code => this.setState({code}) } placeholder="Code" />
                    </Item>
                    <Body>
                        <Button style={{ marginTop: 20 }} full onPress={() => this.verify()}><Text>Verify</Text></Button>
                    </Body>
                </Form>  
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(VerifyPhone)
