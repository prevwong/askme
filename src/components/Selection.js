import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Container, Content} from "native-base";

const Selection = ({selection, onclick}) => {
	const keys = Object.keys(selection);
	const btnColor = ['#1A66BD', '#28B62C', '#FF851B', '#F32C16'];
	const getColor = (index) => (
		{ backgroundColor: btnColor[index] }
	)

	const buttons = keys.map((k, index) => (
		<TouchableOpacity key={k} onPress={() => onclick(k)} style={[styles.button, getColor(index)]} activeOpacity={0.6} >
			<Text style={styles.text} >{selection[k]}</Text>
		</TouchableOpacity>
	));

	return (
		<Container>
			<Content contentContainerStyle={styles.container}>

				{ buttons }
			</Content>
		</Container>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '48%',
		height: 'auto',
		minHeight: '15%',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
		padding: 5
	},
	container: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		paddingHorizontal: 20, 
		flexWrap: 'wrap',
		marginVertical: 5
	},
	text: {
		color: "#fff",
		textAlign: 'center'
	}
})

export default Selection;