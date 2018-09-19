import React, {Component} from "react";
import { Container, Content, Form, Input, Item, Body, Button, Text, Title } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "components/InputError";
import { connect } from "react-redux";
import {extractFirstLastName} from "utils";

import phoneUtil from "libphonenumber-js";
import Modal from "react-native-modal";
import VerifyPhone from "./VerifyPhone";
import firebase from "react-native-firebase";
import { formatNumber, parseNumber } from 'libphonenumber-js'
import api from "../../api";


Yup.addMethod(Yup.string, 'phone', function () {
    return this.test({
        name: 'phone',
        exclusive: true,
        message: 'Must be a phone number',
        test: (value) => {
            try {
                const phone = phoneUtil.parse(value, 'MY')
                return phoneUtil.isValidNumber(phone)
            } catch (e) {
                return false
            }
        }
    })
});

const Schema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phone_number: Yup.string()
        .phone('Invalid phone number')
        .required('Required'),
});


class GetUserInfo extends Component{
    state = {
        first_name: '',
        last_name: '',
        phone_number: '0102866326',
        values: {},
        verificationId: null,
        codeSent: false,
        code: ''
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount(){
        const { _user } = this.props.user.user;
        const { first_name, last_name } = extractFirstLastName(_user.displayName);
        this.setState({
            first_name,
            last_name
        })
    }
    async saveInfo(){
        console.log("saving info...");
        const {first_name, last_name} = this.state.values;
        try {
            await api("users/updateProfile", {...this.state.values});
            console.log("saved!");
            this.props.navigation.navigate("Dashboard");
        } catch (err) {

        }
    }

    submitForm(values) {
        console.log("form submitted");
        this.setState({
            values,
        });
        this.sentPhoneVerification();
    }

    sentPhoneVerification() {
        const { phone_number } = this.state.values;
        const parsed = parseNumber(phone_number, {
            extended: true,
            defaultCountry: 'MY'
        });
        const formatted = formatNumber(parsed, 'E.164');

        firebase.auth().verifyPhoneNumber(formatted).on('state_changed', (phoneAuthSnapshot) => {
            switch (phoneAuthSnapshot.state) {
                case firebase.auth.PhoneAuthState.CODE_SENT:
                    console.log("code sent");
                    this.setState({
                        "verificationId": phoneAuthSnapshot.verificationId,
                        "codeSent": true
                    });
                    break;
            }
        }, (error) => {
            console.log("error", error);
        }, (phoneAuthSnapshot) => {
            if (phoneAuthSnapshot.code) {
                this.setState({
                    code: phoneAuthSnapshot.code
                });
            }
        });
    }

    render(){
        const { first_name, last_name, phone_number, codeSent, verificationId, code } = this.state;
        return (
            <Container>
                <Content style={{paddingTop:50}}>
                    <Title style={{marginBottom:20}}><Text style={{fontSize: 25}}>Update info</Text></Title>
                    <Formik
                        enableReinitialize={true}
                        validationSchema={Schema}
                        initialValues={{ first_name, last_name, phone_number }}
                        onSubmit={values => {
                            this.submitForm(values);
                        }}>
                        {({ errors, touched, handleChange, handleSubmit, values }) => (
                            <Form>
                                
                                <Item fixedLabel>
                                    <Input value={values.first_name} onChangeText={handleChange('first_name')} placeholder="First name" />
                                    {errors.first_name && touched.first_name ? <InputError error={errors.first_name} /> : null}
                                </Item>
                                <Item fixedLabel>
                                    <Input value={values.last_name} onChangeText={handleChange('last_name')} placeholder="Last name" />
                                    {errors.last_name && touched.last_name ? <InputError error={errors.last_name} /> : null}
                                </Item>
                                <Item fixedLabel>
                                    <Input value={values.phone_number} onChangeText={handleChange('phone_number')} placeholder="Phone number" />
                                    {errors.phone_number && touched.phone_number ? <InputError error={errors.phone_number} /> : null}
                                </Item>
                                <Body>
                                    <Button style={{ marginTop: 20 }} full onPress={handleSubmit}><Text>Save info</Text></Button>
                                </Body>
                            </Form>
                        )}
                    </Formik>
                </Content>
                <Modal 
                    style={{height: 300}}
                    onBackdropPress={() => this.setState({ codeSent: false })}
                    onSwipe={() => this.setState({ codeSent: false })}
                    swipeDirection="left"
                    hideModalContentWhileAnimating={true} 
                    isVisible={codeSent}
                >
                    <VerifyPhone 
                        verificationId={verificationId} 
                        code={code} 
                        onSuccess={() => {
                            this.saveInfo();
                        }}
                    />
                </Modal>
            </Container>
        )
    }
}

const mapDispatchToProps = {
    dispatchCreateUser: (email, password) => createUser(email, password),
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(GetUserInfo)
