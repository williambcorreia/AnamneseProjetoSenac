import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { style } from '../styles'

export function Evolucao() {
	return(
		<View style={style.container}>
			<Text>Evoluções</Text>
		</View>
	)
}

export function Prescricao() {
	return(
		<View style={style.container}>
			<Text>Prescrições</Text>
		</View>
	)
}

export function Perfil() {
	return(
		<View style={style.container}>
			<Text>Perfil</Text>
		</View>
	)
}
