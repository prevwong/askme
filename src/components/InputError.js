import React, {Component} from "react";
import { Text } from "native-base";

export default class InputError extends Component {
    render(){
        return ( 
            <Text style={{paddingRight: 10, color:"red"}}>{this.props.error}</Text>
        )
    }
}