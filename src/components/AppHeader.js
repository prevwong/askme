
import React, { Component } from 'react';
import {
    Text,
} from 'react-native';

import { Header, Left, Button, Icon, Right, Body, Title, Drawer, Content, View, Container } from 'native-base';
import { name as appName } from '../../app.json';
import Sidebar from "./Sidebar";

export default class AppHeader extends Component {
    states = {
        pages: [
            { title: "Reminders", page: "Reminders", icon: "" },
            { title: "Events", page: "", icon: "" },
            { title: "Medications", page: "", icon: "" },
            { title: "Settings", page: "", icon: "" }
        ]
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    render() {
        const title = this.props.title ? this.props.title : appName;
        return (
            <Header style = {{backgroundColor:"#eee" }}>
                {this.props.left === undefined ? (
                    <Left>
                        <Button transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name='menu' style={{color:"#333"}} />
                        </Button>
                    </Left>
                    ) : this.props.left ? this.props.left : null }
                <Body>
                    <Title style={{ color:"#333", paddingLeft: this.props.left === false ? 20 : 0 }}>{title}</Title>
                </Body>
                <Right>
                    {this.props.right}
                </Right>
            </Header>
        );
    }
}