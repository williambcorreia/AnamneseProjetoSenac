import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { style } from '../styles'
import Button from '../components/Button'
import CfgButton from '../components/ConfigButton'
import RoundBtn from '../components/RoundButton'
import CloseBtn from '../components/CloseButton'

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
	return(
		<View style={style.container}>
		<View style={style.greenBorder}/>
			<Text>Transcricao</Text>
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
		Alert.alert("Encerrar Sessão", "Deseja realmente sair da sua conta?",
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
