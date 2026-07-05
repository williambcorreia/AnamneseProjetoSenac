import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native"; 
import { FontAwesome5 } from "@expo/vector-icons";
import { useSpeechRecognitionEvent, ExpoSpeechRecognitionModule } from "expo-speech-recognition";

export default function RecordBtn({finalGravacao, mudouTexto, title, iconName, iconColor, iconSize, ...props}) {

	const [recOn, setRecOn] = useState(false)
	const [textoVoz, setTextoVoz] = useState("")
	const textoAcumulado = useRef("")

	useEffect(() => {
		async function obterPermissao() {
			const resposta = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
			if (!resposta.granted) {
				console.warn("A permissão para usar o microfone foi negada pelo usuário.");
			}
		}
		obterPermissao();
	}, []);

	useEffect(() => {
		return () => {
			ExpoSpeechRecognitionModule.abort()
		}
	}, [])

	useSpeechRecognitionEvent("start", () => {setRecOn(true)})
	useSpeechRecognitionEvent("end", (event) => {

		setRecOn(false)
		const resultado = textoVoz.trim();
		if (resultado.length > 0) {
				finalGravacao(resultado)
		}
	})

	useSpeechRecognitionEvent("result", (event) => {
		if (!event.results) return;
		
		console.log("Resultados: ", event.results)
		const textoProvavel = event.results[0].transcript.trim()

		if (event.isFinal) {
			textoAcumulado.current = textoAcumulado.current ? `${textoAcumulado.current} ${textoProvavel}` : textoProvavel
			setTextoVoz(textoAcumulado.current)
			mudouTexto(textoAcumulado.current)
		}
})

  const startRec = () => {
		console.log("Gravação iniciada...")
    if (recOn) {
      ExpoSpeechRecognitionModule.stop();
    } else {
      setTextoVoz("")
			mudouTexto("")

		ExpoSpeechRecognitionModule.start({
			lang: "pt-BR",
			interimResults: true,
			continuous: true,
			requiresOnDeviceRecognition: true,
			androidIntentOptions: {
				EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 15000,
				EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 15000,
			}
		})
  }
}

	return(
		<TouchableOpacity style={[style.button, recOn ? style.activeBtn : null]} onPress={startRec} {...props}>
			<FontAwesome5 name={recOn ? "stop" : "microphone"} size={iconSize} color={iconColor}/>

			{recOn ? 
				<Text style={style.font}>Clique para encerrar</Text>
				: <Text style={style.font}>Clique para evoluir</Text>
			}
		</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	button: {
		backgroundColor: 'mediumseagreen',
		borderRadius: 100,
		width: 160,
		height: 160,
		paddingTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '45%',
	},

	font: {
		fontSize: 12,
		fontFamily: "Inter_500Medium",
		color: 'white'
	},

	activeBtn: {
		backgroundColor: 'orangered'
	},

})
