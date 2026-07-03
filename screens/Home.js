import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { style } from '../styles'
import Button from '../components/Button'
import CfgButton from '../components/ConfigButton'
import RoundBtn from '../components/RoundButton'
import CloseBtn from '../components/CloseButton'
import RecordBtn from '../components/RecordButton'
import Input from '../components/Input'
import LongInput from '../components/LongInput'
import { executarLLM } from '../services/llm'
import { seedEvolucaoDB } from '../database/InitDB'

export function Evolucao({route, navigation}) {

	const {role} = route.params || {}

	return (
		<View style={style.container}>
			<Text>Evoluções</Text>
				<RoundBtn iconName="plus" iconColor='white' onPress={() => navigation.navigate('Transcrição')}/>
		</View>
	)
}

export function Transcricao({route, navigation}) {

	const [legenda, setLegenda] = useState("")
	const scrollViewRef = useRef(null)

	const textoRecebido = async (texto) => {
		console.log("Texto da gravação: ", texto)

		try {
			setTimeout(() => {
				navigation.navigate("Carregamento")
			}, 0)
			console.log("Processando na LLM...")
			const textoFormatado = await executarLLM(texto)
			console.log("Texto da LLM: ", textoFormatado)
			navigation.replace("Rascunho", {textoFormatado: textoFormatado})
		} catch (err) {
			console.error("Erro: ", err)
			navigation.navigate("Transcrição")
		}
	}

	return(
		<View style={style.container}>
		<View style={style.greenBorder}/>
			<RecordBtn iconSize={60} iconColor='white' finalGravacao={textoRecebido} mudouTexto={(textoAtual) => setLegenda(textoAtual)}/>
			<CloseBtn iconName="chevron-left" onPress={() => navigation.goBack()}/>
			{legenda ? (
				<View style={style.legenda}>
					<ScrollView ref={scrollViewRef} 
						onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true})}>
						<Text style={style.f22m}>{legenda}</Text>
					</ScrollView>
				</View>
			) : null}
		</View>
	)
}

export function Prescricao({route}) {
	return(
		<View style={style.container}>
			<Text>Prescrições</Text>
		</View>
	)
}

export function Config({route, navigation}) {

	const handleLogout = () => {
		Alert.alert("Encerrar sessão", "Deseja realmente sair da sua conta?",
			[{ text: "Cancelar", style:'cancel'}, {text: "Sair", onPress: () => navigation.replace('Login')}],
			{cancelable: true}
		)
	}

	return(
		<View style={[style.container, {justifyContent: 'flex-start'}]}>
			<CfgButton title="Sair" titleColor="red" onPress={handleLogout}/>
		</View>
	)
}

export function Carregamento({navigation}) {
	return (
		<View style={style.container}>
			<View style={style.greenBorder}/>
			<ActivityIndicator size={100} color='mediumseagreen'/>
			<Text style={style.f16r}>Formatando evolução na IA...</Text>
		</View>
	)
}

export function Rascunho({route, navigation}) {

	const [db, setDb] = useState(null)
	const [nomePaciente, setNomePaciente] = useState("")
	const [evolucao, setEvolucao] = useState(textoFormatado || "")
	const {textoFormatado} = route.params || {}

	useEffect(() => {
		async function connectDB() {
			const connection = await seedEvolucaoDB()
			if (connection === "err") {
				Alert.alert("Erro", "Não foi possível se conectar ao banco de dados")
			} else {
				setDb(connection)
			}
		}
		connectDB()
	}, [])

	const finalizarEvolucao = async () => {
		if (!nomePaciente) { Alert.alert("Erro", "Preencha o campo de nome do paciente"); return }

		try {
			//await db.runAsync(`INSERT INTO evolucoes (feito_por, nome_paciente, texto_evolucao, data) VALUES (?, ?, ?, ?);`)
			navigation.goBack()
		} catch (err) {
			return "err"
		}
	}

	return (
		<View style={style.container}>
			<View style={style.greenBorder}/>
				<View style={style.draftContainer}>
					<Input 
					placeholder='Nome do paciente' 
					placeholderTextColor='gray'
					color='black' 
					iconName='address-card' 
					iconSize={27}
					onChangeText={setNomePaciente}
					value={nomePaciente}/>

					<LongInput
					color='black'
					multiline={true}
					onChangeText={setEvolucao}
					value={evolucao}></LongInput>
				</View>
			<Button title={"Finalizar"} onPress={finalizarEvolucao}/>
		</View>
	)
}
