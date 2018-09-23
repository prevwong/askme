import React, {Component} from "react";
import { Container, Content, Form, Input, Item, Body, Button, Text, Title, Picker, Toast } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "components/InputError";
import { connect } from "react-redux";
import { extractFirstLastName, formatPhoneNumber} from "utils";

import phoneUtil, {parseNumber }  from "libphonenumber-js";
import Modal from "react-native-modal";
import VerifyPhone from "./VerifyPhone";
import firebase from "react-native-firebase";
import api from "api";


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
        gender: '',
        phone_number: '',
        original_phone_number: '',
        values: {},
        verificationId: null,
        codeSent: false,
        code: ''
    }
    static navigationOptions = ({navigation}) => {
        if (!navigation.getParam("sidebar")) {
            return {
                header: null
            }
        }
    }
    componentDidMount(){
        const { user } = this.props.user;
        // console.log("USER",)
        const { first_name, last_name } = extractFirstLastName(user.displayName);
        const { phoneNumber: phone_number } = user;

        this.setState({
            first_name,
            last_name,
            phone_number,
            original_phone_number: phone_number
        })
    }
    async saveInfo(){
        console.log("saving info...");
        const {first_name, last_name} = this.state.values;
        try {
            await api("users/updateProfile", {...this.state.values});
            console.log("saved!");
            this.props.dispatchSaveInfo({...this.state.values});
            // this.props.navigation.navigate("Dashboard");
        } catch (err) {

        }
    }
    
    submitForm(values) {
        console.log("form submitted");
        const {phone_number} = values;
        const {original_phone_number} = this.state;
        this.setState({
            values,
        });
        if ( formatPhoneNumber(phone_number) !== original_phone_number ) {
            this.sentPhoneVerification();
        } else {
            Toast.show({
                text: 'Profile updated!',
            });
        }
        
    }

    sentPhoneVerification() {
        const { phone_number } = this.state.values;
       
        const formatted = formatPhoneNumber(phone_number);

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
        const { first_name, last_name, phone_number, gender, codeSent, verificationId, code } = this.state;
        return (
            <Container>
                <Content style={{paddingTop:50}}>
                    <Title style={{marginBottom:20}}><Text style={{fontSize: 25}}>Edit profile</Text></Title>
                    <Formik
                        enableReinitialize={true}
                        validationSchema={Schema}
                        initialValues={{ first_name, last_name, gender, phone_number }}
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
                                    <Picker
                                        note
                                        mode="dropdown"
                                        selectedValue={values.gender}
                                        onValueChange={handleChange("gender")}
                                    >
                                        <Picker.Item label="Male" value="male" />
                                        <Picker.Item label="Female" value="female" />
                                    </Picker>
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
