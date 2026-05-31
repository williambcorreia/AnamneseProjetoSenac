import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 

export default function Button({title}) {
	return(
			<TouchableOpacity style={style.button}>
			<Text style={{fontSize: 26, color:'white'}}>{title}</Text>
		</TouchableOpacity>
	)
}

export const style = StyleSheet.create({
	button: {
		backgroundColor: 'green',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 20,
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
