import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { FontAwesome5 } from "@expo/vector-icons";
import { useSpeechRecognitionEvent, ExpoSpeechRecognitionModule } from "expo-speech-recognition";

export default function RecordBtn({title, iconName, iconColor, iconSize, ...props}) {

	const [recOn, setRecOn] = useState(false)

	return(
		<TouchableOpacity style={[style.button, recOn ? style.activeBtn : null]} onPress={() => setRecOn(!recOn)} {...props}>
			<FontAwesome5 name={recOn ? "stop" : "microphone"} size={iconSize} color={iconColor}/>

			{recOn ? 
				<Text style={{color: 'white'}}>Clique para encerrar</Text>
				: <Text style={{color: 'white'}}>Clique para evoluir</Text>
			}
		</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	button: {
		backgroundColor: 'mediumseagreen',
		borderRadius: 100,
		width: 200,
		height: 200,
		gap: 10,
		paddingTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},

	activeBtn: {
		backgroundColor: 'orangered'
	},

})

