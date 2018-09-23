/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import { signOut } from '../store/actions/auth';
class Sidebar extends Component {
    state = {
        links : [
            { title: "Dashboard", page: "Dashboard" },
            { title: "Leaderboard", page: "LeaderBoard" },
            { title: "Profile", page: "Profile" },
            { title: "Sign out", signOut: true } 
        ]
    }
    componentDidMount(){
    }
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params : {
                sidebar: true
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    navigate(link) {
        if ( link.signOut ) {
            this.props.dispatchSignOut()
        } else {
            this.navigateToScreen(link.page)();
        }
    }

    render() {
        const {links} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                        { links.map((link, i) => 
                            <View key={i} style={styles.navItemStyle}>
                                <Text style={styles.navItemTextStyle} onPress={() => this.navigate(link)}>{link.title}</Text>
                            </View>
                        )}
                </ScrollView>
            </View>
        );
    }
}

const styles =  {
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"rgb(177, 214, 201)"
    },
    navItemStyle: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    navItemTextStyle: {
        fontSize: 20,
        textAlign: "center",
        color: "rgb(50, 34, 80)",
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
};

const mapDispatchToProps = {
    dispatchSignOut: () => signOut(),
}


export default connect(null, mapDispatchToProps)(Sidebar)
