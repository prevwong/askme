import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Form, Item, Input, Title, Text, Body, Container, Content} from "native-base";
import { connect } from 'react-redux'
import { authenticate, socialAuthenticate, logInCancel, logInSuccess } from 'store/actions/auth'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        accessCode: ''
    }

   
    render() {
        const {email, password} = this.state;
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: 'center', paddingHorizontal: 20 }}>
                    <Title><Text>Sign In</Text></Title>
                    <Form>
                        <Item>
                            <Input onChangeText={(email => this.setState({email}))} placeholder="Email" />
                        </Item>
                    </Form>
                    <Form>
                        <Item>
                            <Input onChangeText={(password => this.setState({password}))} secureTextEntry={true} placeholder="Password" />
                        </Item>
                        <Body >
                            <Button onPress={() => this.props.dispatchAuthenticate(email, password)} full style={{  marginTop: 20 }} type="primary"><Text>Log me in</Text></Button>
                            <Button onPress={() => { console.log("sign in"); this.props.dispatchSocialAuthenticate() }} full style={{ marginTop: 20 }} type="primary"><Text>Sign in using Google</Text></Button>
                        </Body>
                    </Form>
                </Content>
            </Container>
        );
    }
}


const mapDispatchToProps = {
    dispatchAuthenticate: (email, password) => authenticate(email, password),
    dispatchSocialAuthenticate: (email, password) => socialAuthenticate(email, password),
    dispatchLogInCancel: () => {
        return ((dispatch) => {
            dispatch(logInCancel())
        });
    },
    dispatchLogInSuccess: () => {
        return ((dispatch) => {
            dispatch(logInSuccess());
        })
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
