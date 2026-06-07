import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"; 

export default function CfgButton({title, onPress, titleColor, ...props}) {
	return(
				<TouchableOpacity style={style.cfgButton} onPress={onPress} {...props}>
					<Text style={[style.font, {color: titleColor}]}>{title}</Text>
				</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	cfgButton: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 10,
		borderWidth: 1
	},

	font: {
		fontSize: 16,
		fontFamily: 'Inter_500Medium',
	}

})

