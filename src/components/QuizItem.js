import React, {Component} from "react";
import { Card, CardItem, Body, Text, Title, Subtitle, Left, Right, View, Button, Icon} from "native-base";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import firebase from "react-native-firebase";
import { connect } from "react-redux";

dayjs.extend(relativeTime)

class QuizItem extends Component {
    navigate(){
        this.props.navigation.navigate("Quiz");
    }
    render(){
        const {user} = this.props.user; 
        let {generalKnowledge, title, classroom, full, createdAt, results} = this.props;

        
        let result = results ? results[user.uid] : false,
              pointsEarned = results ? result.pointsEarned : false,
              completed = results ? result.completed : false;


        if ( generalKnowledge ) {
            title = "General Knowledge";
            completed = false;
        }
        return (
            <Card style={{ flex:1,  borderRadius: 4, elevate: 100, paddingVertical: 10, height: full || generalKnowledge ? "auto" : 160}}>
                <View style={{flex:1}}>
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
                    <CardItem cardBody style={{ paddingLeft: 15 }}>
                        <Left>
                            <Text style={{ width: "100%", textDecorationLine: completed ? 'line-through' : "none", fontSize: 30 }}>{title}</Text>
                        </Left>
                    </CardItem>
                    { generalKnowledge &&
                        <CardItem cardBody style={{ marginBottom:10, paddingLeft: 15 }}>
                            <Left>
                                <Text style={{ width: "100%", textDecorationLine: completed ? 'line-through' : "none", fontSize: 15 }}>Let's see how much you really know</Text>
                            </Left>
                        </CardItem>
                    }
                </View>
                <CardItem footer style={{justifyContent: 'space-between'}}>
                    <Left>  
                        <Button onPress={()=>this.navigate()} small style={{borderRadius:100, paddingVertical: 0, paddingHorizontal: 10}}>
                            <Text style={{ textTransform:"uppercase", fontSize: 11 }}>{ completed ? "View Results" : "Start" }</Text>
                        </Button>
                        {
                            completed && pointsEarned && full && 
                                <Text style={{fontSize:11, opacity:0.8}}>+{pointsEarned}pts</Text>
                        }
                    </Left>
                    {
                        generalKnowledge && 
                        <Button iconLeft={false} dark small iconRight transparent={true} style={{fontSize: 10, opacity:0.5}}><Text>View Leaderboard</Text><Icon type="Entypo" name='chevron-small-right' /></Button>
                    }
                </CardItem>
            </Card>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(QuizItem)
