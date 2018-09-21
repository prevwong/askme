import React, {Component} from "react";
import { Container, Content, Text } from "native-base";
import AppHeader from "../../../components/AppHeader";

export default class Quiz extends Component {
    render(){
        return (
            <Container>
                <AppHeader {...this.props} />
                <Content>
                    <Text>Hi world</Text>
                </Content>
            </Container>
        )
    }
}