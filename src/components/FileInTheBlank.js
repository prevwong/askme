import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Container, Content, Item, Input, Button } from "native-base";

class FillInTheBlank extends Component {
	state = {
		answer: "",
		canSubmit: false,
		error: true // Error present == true, error absent == false
	};

	getPlaceholder = () => {
		const ph = ["Just do it!", "This is easy!", "C'mon!", "Seriously??!!", "The sky is so high", "Rose is red", "Voilet is blue"];

		return ph[Math.floor(Math.random() * Math.floor(ph.length))];
	};

	onChange = text => (
		this.setState({
			answer: text,
			error: text === ""
		})
	);

	onSubmit = () => {
		this.setState({
			error: this.validateInput()
		});
		
		!this.state.error && this.props.submit(this.state.answer);
	};

	validateInput = () => this.state.answer === "";

	setBackgroundColor = () => ({ backgroundColor: this.state.error ? '#c3c3c3' : '#28B62C'});
	
	render() {
		return (
			<Container>
				<Content contentContainerStyle={styles.container}>
					<Item style={styles.input} rounded>
						<Input placeholder={this.getPlaceholder()} style={styles.text} onChangeText={this.onChange} name="answer" value={this.state.answer}/>
					</Item>

					<TouchableOpacity style={[styles.button, this.setBackgroundColor()]} onPress={this.onSubmit} disabled={this.state.error}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		minHeight: 55,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 15,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18
	},
	container: {
		flex: 1, 
		flexDirection: 'row', 
		paddingHorizontal: 20, 
		flexWrap: 'wrap',
		marginVertical: 5,
		width: "100%",
	},
	text: {
		textAlign: 'center',
		width: "100%",
	},
	input: {
		width: "100%",
	}
})


export default FillInTheBlank;