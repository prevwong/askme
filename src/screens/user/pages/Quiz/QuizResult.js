import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AppHeader from "components/AppHeader";
import { Container, Content, Text, Card, CardItem, Icon } from 'native-base';
import HeaderButtons, { HeaderButton, Item as HeaderItem } from 'react-navigation-header-buttons';
import questions from "api/routes/questions"
// Required props: An object with key name as result and value as an array of object with the shape of {question : String, answer: String, choice: String}
class Result extends Component {
	state = {
		
	}

	static navigationOptions = ({navigation}) => {
		return {
			headerLeft: null,
			headerRight: (
				<HeaderButtons HeaderButtonComponent={props => <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="#333" />}>
					{/* use Item or HeaderButtons.Item */}
					<HeaderButtons.Item title="close" iconName="md-close" onPress={() => navigation.navigate("Dashboard")} />
				</HeaderButtons>
			)
		}
	}
	
	renderBackgroundColor = (e) => ({
		backgroundColor: e.answer.toLowerCase() === e.choice.toLowerCase() ? '#B6EBBE' : '#EBC8D4'
	})

	countCorrect = () => {
		const { navigation } = this.props;
		const result = navigation.getParam('result'); // Array
		var correct = 0;
		result.map((object, index) => {
			if(object.answer.toLowerCase() === object.choice.toLowerCase()) correct++;
		})
		questions.addDannyPoint(correct * 10)
		return correct;
	}

	renderCards = () => {
		const { navigation } = this.props;
		const result = navigation.getParam('result'); // Array

		return result.map((object, index) => (
			<Card key={"question-" + index} style={[styles.card, this.renderBackgroundColor(object)]}>
				<CardItem header style={styles.cardItem}>
					<Text>
						{ object.question }
					</Text>
				</CardItem>
				
				{!(object.choice.toLowerCase() === object.answer.toLowerCase())&& <CardItem style={styles.cardItem}>
					<Icon name="close" />
					<Text>
						{ object.choice }
					</Text>
				</CardItem>}

				<CardItem style={styles.cardItem}>
					<Icon name="checkmark" />
					<Text>
						{ object.answer }
					</Text>
				</CardItem>
			</Card>
		))
	}

	render() {
		const correct = this.countCorrect();
		return(
			<Container style={styles.container}>
				<Content>
					<Text style={[styles.text, { paddingTop: 30 }]}>You've got</Text>
					<Text style={[styles.text, styles.count]}>{correct}</Text>
					<Text style={[styles.text, { paddingBottom: 30 }]}>{correct === 1 ? 'question' : 'questions'} correct</Text>

					{ this.renderCards() }					
				</Content>
			</Container>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent'
	},
	card: {
		paddingBottom: 20,
		paddingTop: 10,
		paddingLeft: 5
	},
	cardItem: {
		backgroundColor: 'transparent'
	},
	text: {
		textAlign: 'center',
	},
	count: {
		fontSize: 45,
		paddingVertical: 10
	}
})

export default Result;