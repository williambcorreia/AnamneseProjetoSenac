import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { FontAwesome5 } from "@expo/vector-icons";

export default function CloseBtn({title, iconName, iconColor, onPress, ...props}) {
	return(
			<TouchableOpacity style={style.closeButton} onPress={onPress} {...props}>
				{iconName ? (
					<FontAwesome5 name={iconName} size={24} color={iconColor}/>
				) : null}
			</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	closeButton: {
		width: 50,
		height: 50,
		position: 'absolute',
		left: 15,
		top: 50 
	},

})


