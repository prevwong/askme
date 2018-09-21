import React, {Component} from "react";
import { Card, CardItem, Body, Text, Title, Subtitle, Left, Right, View, Button} from "native-base";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

dayjs.extend(relativeTime)

export default class QuizItem extends Component {
    navigate(){
        this.props.navigation.navigate("Quiz");
    }
    render(){
        const {title, completed, classroom, full, pointsEarned, createdAt} = this.props;
        console.log("creaed", createdAt)
        return (
            <Card style={{borderRadius:4, elevate: 100, paddingVertical:10}}>
                { full && 
                    <CardItem>
                        <Left>
                            { classroom && <Text style={{ flex: 3, fontSize: 12}}>A new quiz has been added to {classroom.name}</Text> } 
                            <Text style={{ flex: 1, fontSize: 12, textAlign: "right"}}>
                                {dayjs().to(dayjs(createdAt))}
                            </Text>
                        </Left>
                    </CardItem>
                }
                <CardItem cardBody style={{paddingLeft:15}}>
                    <Left>
                        <Text style={{ textDecorationLine: completed ? 'line-through' : "none", fontSize: 30 }}>{title}</Text>
                    </Left>
                </CardItem>
                <CardItem footer>
                    <Left>  
                        <Button onPress={()=>this.navigate()} small style={{borderRadius:100, paddingVertical: 0, paddingHorizontal: 10}}>
                            <Text style={{ textTransform:"uppercase", fontSize: 11 }}>{ completed ? "View Results" : "Start" }</Text>
                        </Button>
                        {
                            completed && pointsEarned && full && 
                                <Text style={{fontSize:11, opacity:0.8}}>+{pointsEarned}pts</Text>
                        }
                    </Left>
                </CardItem>
            </Card>
        )
    }
}