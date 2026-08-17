import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from "@expo/vector-icons";
import { Evolucao, Config, Prescricao } from './Home.js'

const Tab = createBottomTabNavigator()

export default function HomeTabs({route}) {

	const {userInfo} = route.params || {}

	return(
		<Tab.Navigator
			screenOptions={{
			tabBarActiveTintColor: 'mediumseagreen',
			tabBarInactiveTintColor: 'gray',
			headerStyle: style.header,
			headerTitle: '',
			tabBarStyle: style.tabBar,
			tabBarLabelStyle: style.tabBarLabel}}>

			{ userInfo?.cargo === 'Enf' || userInfo?.cargo === 'TecEnf' ? (
			<>
				<Tab.Screen 
				name="Evolução" 
				component={Evolucao} 
				initialParams={{ userInfo }}
				options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='notes-medical' size={size} color={color}/>)}}/>

				<Tab.Screen 
				name="Prescrição" 
				component={Prescricao} 
				initialParams={{ userInfo }}
				options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='clipboard-check' size={size} color={color}/>)}}/>
			</>
			) : null}

			<Tab.Screen 
			name="Configurações" 
			component={Config} 
			options={{tabBarIcon: ({ color, size }) => (<FontAwesome5 name='cog' size={size} color={color}/>)}}/>

		</Tab.Navigator>
	)
}

const style = StyleSheet.create({
	
	header: {
		height: '4%'
	},

	tabBar: {
		height: '8%',
		alignItems: 'center',
		justifyContent: 'center'
	},

	tabBarLabel: {
		fontSize: 13,
		fontFamily: 'Inter_500Medium',
		paddingTop: 2
	}

})
