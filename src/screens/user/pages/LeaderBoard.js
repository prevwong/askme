import React, {Component} from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Text, Content, Body, Container, Card, CardItem, Title, Icon } from "native-base";
import { signOut } from "store/actions/auth";
import {connect} from "react-redux";
import AppHeader from "components/AppHeader";
import QuizItem from "components/QuizItem";
import firebase from "react-native-firebase";
import Winner from "components/Winner";
import HeaderButtons, { HeaderButton, Item as HeaderItem } from 'react-navigation-header-buttons';
import leaderboard from 'api/routes/leaderboard';
import api from "../../../api";

class Leaderboard extends Component {
    state = {
        available: true,
        leaderboard: []
    }

    static navigationOptions = ({ navigation }) => ({
        title: "Leaderboard",
        headerLeft: null,
        headerStyle: {
            backgroundColor: '#eeer',
        },
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={(props) => <HeaderButton {...props} IconComponent={Icon} />}>
                <HeaderItem title="menu" iconName="menu" onPress={() => navigation.openDrawer()} />
            </HeaderButtons>
        )
    })
	
	componentDidMount() {
		api("leaderboard/getLeaderBoard").then(lb => {
			let tempLeaderBoard = [];
			lb.forEach(user => {
				tempLeaderBoard.push(user.data())
			});

			tempLeaderBoard.sort((a, b) => {
				return a.pointsEarned - b.pointsEarned;
			}).reverse();
			
			this.setState({
				leaderboard: tempLeaderBoard.slice(1),
				leader: tempLeaderBoard[0]
			});
		}).catch(err => {
			console.log(err);
		})
	}

	renderBackgroundColor = (index) => {
		var color = null;
		if(index === 0) color = '#F5E88A';
		else if (index === 1) color = '#B6B5B8';
		else if(index === 2) color = '#D1A970'
		return { backgroundColor: color}
	}

	leaderBoard = () => {
		const leaderboard = this.state.leaderboard;
		return leaderboard.map((obj, index) => (
			<Content key={"lb" + index} contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: "center" }}>
				<Text style={[styles.name, styles.transparent]}>{obj.info.name}</Text>
				<Text style={[styles.points, styles.transparent]}>Marks scored: {obj.pointsEarned}</Text>
			</Content>
		))
	}

    render() {
        console.log("LEADERBOARD-RENDER");
		const leader = this.state.leader;
		console.log(leader);
        return (
            <Container>
            	{
            		!this.state.available && 
						<Content style={styles.content}>
							<Card style={styles.warningCard}>
								<CardItem style={{backgroundColor: 'transparent'}}>
									<Text>Leaderboard is under construction</Text>
								</CardItem>
							</Card>
						</Content>
            	}
				
				<Text style={styles.leading}>
					Leading Champion
				</Text>

				{
					leader && 
					<Content contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: "center" }} >
						<Text style={[styles.name, styles.transparent]}>{leader.info.name}</Text>
						<Text style={[styles.points, styles.transparent]}>Marks scored: {leader.pointsEarned}</Text>
					</Content>
				}

				<Text style={styles.leading}>
					Other Leading Players
				</Text>
				{ this.leaderBoard() }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
	content: {
		backgroundColor:"#eee", 
		padding: 10
	},
	warningCard: {
		backgroundColor: '#EBC8D4',
		paddingVertical: 25
	},
	name: {
		fontSize: 25,
	},
	points: {
		fontSize: 15,
	},
	transparent: {
		backgroundColor: "transparent"
	},
	leading: {
		fontSize: 12,
		paddingVertical: 20,
		paddingHorizontal: 5,
		backgroundColor: "#eee",
		textAlign:"center",
		textTransform:"uppercase"
	}
})

export default Leaderboard;
