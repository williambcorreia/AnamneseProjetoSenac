import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { FontAwesome5 } from "@expo/vector-icons";

export default function RoundBtn({title, iconName, iconColor, onPress, ...props}) {
	return(
			<TouchableOpacity style={style.button} onPress={onPress} {...props}>
				{iconName ? (
					<FontAwesome5 name={iconName} size={24} color={iconColor}/>
				) : null}
			</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	button: {
		backgroundColor: 'mediumseagreen',
		borderRadius: 100,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 25,
		bottom: 30 
	},

})

