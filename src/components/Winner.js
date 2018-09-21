import React, {Component} from "react";
import { Card, CardItem, Body, Text, Title, Subtitle, Left, Right, View, Button} from "native-base";
import {displayName} from "utils";

export default class Winner extends Component {
    render(){
        const {first_name, last_name, pointsEarned, quote} = this.props.winner;
        return (
            <Card style={{ backgroundColor:"rgb(85, 149, 254)", borderRadius:4, paddingBottom:30, elevate: 100, paddingVertical:10}}>
                <CardItem style={{ backgroundColor: "rgb(85, 149, 254)" }}>
                    <Left>
                        <Text style={{ color: "#fff", flex: 3, fontSize: 12 }}>This week's winner is {displayName(first_name, last_name)} <Text style={{ color: "#fff", marginLeft:5, fontSize:11, fontWeight:"bold"}}>{pointsEarned}pts</Text></Text> 
                    </Left>
                </CardItem>
                <CardItem cardBody style={{ backgroundColor: "rgb(85, 149, 254)", paddingLeft:15}}>
                    <Left>
                        <Text style={{ color: "#fff", fontSize: 30 }}>{quote}</Text>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}
