import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { FontAwesome5 } from "@expo/vector-icons";
import { useSpeechRecognitionEvent, ExpoSpeechRecognitionModule } from "expo-speech-recognition";

export default function RecordBtn({finalGravacao, title, iconName, iconColor, iconSize, ...props}) {

	const [recOn, setRecOn] = useState(false)
	const [textoVoz, setTextoVoz] = useState("")

	useEffect(() => {
		async function obterPermissao() {
			const resposta = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
			if (!resposta.granted) {
				console.warn("A permissão para usar o microfone foi negada pelo usuário.");
			}
		}
		obterPermissao();
	}, []);

	useSpeechRecognitionEvent("start", () => {setRecOn(true)})
	useSpeechRecognitionEvent("end", () => {

		setRecOn(false)
		if (textoVoz.trim().length > 0) {
			finalGravacao(textoVoz)
		}

	})

	useSpeechRecognitionEvent("result", (event) => {
		const resultado = event.results[0]?.transcript
		if (resultado) {
			setTextoVoz(resultado)
		}
	})

  const startRec = () => {
		console.log("clique")
    if (recOn) {
      ExpoSpeechRecognitionModule.stop();
    } else {
      setTextoVoz("")

		ExpoSpeechRecognitionModule.start({
			lang: "pt-BR",
			interimResults: true,
			continuous: true,
		})
  }
}

	return(
		<TouchableOpacity style={[style.button, recOn ? style.activeBtn : null]} onPress={startRec} {...props}>
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
