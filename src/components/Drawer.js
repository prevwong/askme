import React, { Component } from "react";
import RootSiblings from 'react-native-root-siblings';
import { View, Container, Content, Text } from "native-base";
import { Animated, TouchableWithoutFeedback, Easing} from "react-native";

export default class Drawer extends Component {
    static sibling = new RootSiblings(null);
    transition = new Animated.Value(0);
    componentDidMount(){
        if ( this.props.show ) {
            this.show();
        }
    }
    close(){
        console.log("closer");
    }

    animate() {
        this.transition.setValue(0)
        Animated.timing(
            this.transition,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.bezier(0.19, 1, 0.22, 1)
            }
        ).start()
    }

    show() {
        const sidebarPos = this.transition.interpolate({
            inputRange: [0, 1],
            outputRange: ["-100%", "0%"]
        });

        const opacity = this.transition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        this.animate();

        Drawer.sibling.update(
            <TouchableWithoutFeedback onPress={() => this.close()}>
                <Animated.View
                    style={[
                    {       

                        flex: 1, 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: "100%", 
                        height: "100%", 
                        backgroundColor: "rgba(0,0,0,0.2)",
                        opacity
                    }
                ]}>
                    <TouchableWithoutFeedback>
                        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, width:300, height: "100%", backgroundColor:"#fff" }}>
                            { this.props.content() }
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
    componentWillReceiveProps(props) {
        if (props.show) {
            this.show();
        }
    }
    componentWillUnmount(){
        console.log("unmounted");
        Drawer.sibling.destroy();
    }
    render() {
        return null;
    }
}