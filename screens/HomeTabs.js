import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from "@expo/vector-icons";
import { Evolucao, Config, Prescricao } from './Home'

const Tab = createBottomTabNavigator()

export default function HomeTabs({route}) {

	const {role} = route.params || {}

	return(
		<Tab.Navigator
			screenOptions={{
			tabBarActiveTintColor: 'mediumseagreen',
			tabBarInactiveTintColor: 'gray',
			headerStyle: style.header,
			headerTitle: '',
			tabBarStyle: style.tabBar,
			tabBarLabelStyle: style.tabBarLabel}}>

			<Tab.Screen 
			name="Evolução" 
			component={Evolucao} 
			initialParams={{ role }}
			options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='notes-medical' size={size} color={color}/>)}}/>

			{ role === 'Enf' ? (
			<Tab.Screen 
			name="Prescrição" 
			component={Prescricao} 
			options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='clipboard-check' size={size} color={color}/>)}}/>
			) : null }

			<Tab.Screen 
			name="Configurações" 
			component={Config} 
			options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='cog' size={size} color={color}/>)}}/>

		</Tab.Navigator>
	)
}

const style = StyleSheet.create({
	
	header: {
		height: 35,
		backgroundColor: 'mediumseagreen',
	},

	tabBar: {
		height: 60,
		alignItems: 'center',
		justifyContent: 'center'
	},

	tabBarLabel: {
		fontSize: 13,
		fontFamily: 'Inter_500Medium',
		paddingTop: 2
	}

})
