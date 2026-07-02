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

	useSpeechRecognitionEvent("start", () => {setRecOn(true)})
	useSpeechRecognitionEvent("end", (event) => {
		setRecOn(false)

		setTextoVoz((textoAtual) => { 
			const resultado = textoAtual.trim();
			if (resultado.length > 0) {
					finalGravacao(resultado)
			}

			return resultado;
		})
	})

	useSpeechRecognitionEvent("result", (event) => {

		if (!event.results) return
		let resultado = event.results.map((result) => result.transcript).join(" ").trim()
		if (!resultado && event.results.length > 0) resultado = event.results[event.results.length - 1].transcript
    
		if (resultado) {
			let textoCompleto = (textoAcumulado.current + " " + resultado).trim()
			setTextoVoz(textoCompleto)
			mudouTexto(textoCompleto)
		}

		const certezaResultado = event.results[event.results.length - 1]
		if (certezaResultado?.isFinal) 
			textoAcumulado.current = (textoAcumulado.current + " " + certezaResultado.transcript).trim()
	})

  const startRec = () => {
		console.log("Gravação iniciada...")
    if (recOn) {
      ExpoSpeechRecognitionModule.stop();
    } else {
      setTextoVoz("")
			mudouTexto("")
			textoAcumulado.current = ""

		ExpoSpeechRecognitionModule.start({
			lang: "pt-BR",
			interimResults: true,
			continuous: true,
			requiresOnDeviceRecognition: true,
			androidIntentOptions: {
				EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 5000,
				EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 5000,
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
		marginBottom: 150
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
