import React, {Component} from "react";
import {View, Image} from "react-native";
import { Container, Content, Form, Input, Item, Body, Button, Text, Title} from "native-base";
import {connect} from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "components/InputError";
import {createUser} from "store/actions/auth";

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password do not match")
        .required('Password confirm is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}>
                <Input {...input} />
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }
    submit(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        });
    }
    render() {
        const {email, password, confirmPassword} = this.state;
        const { signUpError } = this.props.auth;

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, justifyContent:"center"}}>
                    <Title><Text>Sign up</Text></Title>
                    <View style={{ marginVertical: 40, alignItems: "center" }}>
                        <Image source={require('../../img/logo.png')} />
                    </View>
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{ email, password, confirmPassword }}
                        onSubmit={values => this.props.dispatchCreateUser(values.email, values.password)}>
                        {({ errors, touched, handleChange, handleSubmit, values }) => (
                            <Form>
                                <Item>
                                    <Input value={values.email} onChangeText={handleChange('email')} placeholder="Email" />
                                    {errors.email && touched.email ? <InputError error={errors.email} /> : null}
                                </Item>
                                <Item>
                                    <Input value={values.password} secureTextEntry={true} onChangeText={handleChange('password')} placeholder="Password" />
                                    {errors.password && touched.password ? <InputError error={errors.password} /> : null}
                                </Item>
                                <Item>
                                    <Input value={values.confirmPassword}  secureTextEntry={true} onChangeText={handleChange('confirmPassword')} placeholder="Confirm Password" />
                                    {errors.confirmPassword && touched.confirmPassword ? <InputError error={errors.confirmPassword} /> : null}
                                </Item>
                                <Body>
                                    <Button style={{marginTop:20}} full onPress={handleSubmit}><Text>Sign Up</Text></Button>
                                </Body>
                            </Form>
                        )}
                    </Formik>
                </Content>
            </Container>
        )
    }
}


const mapDispatchToProps = {
    dispatchCreateUser: (email, password) => createUser(email, password),
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
