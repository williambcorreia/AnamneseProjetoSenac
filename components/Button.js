import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 

export default function Button({title, onPress, ...props}) {
	return(
			<TouchableOpacity style={style.button} onPress={onPress} {...props}>
			<Text style={style.font}>{title}</Text>
		</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	button: {
		backgroundColor: 'mediumseagreen',
		borderRadius: 100,
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},

	font: {
		fontSize: 22,
		fontFamily: 'Inter_500Medium',
		color: 'white'
	}

})
