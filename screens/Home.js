import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { style } from '../styles'
import Button from '../components/Button'
import CfgButton from '../components/ConfigButton'
import RoundBtn from '../components/RoundButton'
import CloseBtn from '../components/CloseButton'
import RecordBtn from '../components/RecordButton'
import { executarLLM, baixarLLM } from '../services/llm'

export function Evolucao({route, navigation}) {

	const {role} = route.params || {}

	return(
		<View style={style.container}>
			<Text>Evoluções</Text>
			{ role === 'Enf' ? (
				<RoundBtn iconName="plus" iconColor='white' onPress={() => navigation.navigate('Transcrição')}/>
			) : null}
		</View>
	)
}

export function Transcricao({route, navigation}) {

	useEffect(() => {baixarLLM()}, [])

	const textoRecebido = async (texto) => {
		console.log("Texto da gravação: ", texto)

		try {
			console.log("Processando na LLM...")
			const textoFormatado = await executarLLM(texto)
			console.log("Texto da LLM: ", textoFormatado)
		} catch (err) {
			console.error("Erro: ", err)
		}
	}

	return(
		<View style={style.container}>
		<View style={style.greenBorder}/>
			<RecordBtn iconSize={60} iconColor='white' finalGravacao={textoRecebido}/>
			<CloseBtn iconName="chevron-left" onPress={() => navigation.goBack()}/>
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
