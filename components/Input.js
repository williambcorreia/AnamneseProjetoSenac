import React from "react";
import { TextInput, Text, StyleSheet, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Input({iconName, iconPress, ...props}){

  return (
		<View style={style.inputView}>

			<TextInput style={style.input} {...props}></TextInput>

			<View style={style.icon}>
				{iconPress ? (
				<Pressable onPress={iconPress} style={({ pressed }) => ({
					opacity: pressed ? 0.3 : 1
					})}>
					<FontAwesome5 name={iconName} size={24} color='gray'/>
				</Pressable> ) : (
					<FontAwesome5 name={iconName} size={24} color='gray'/>
				)
			}
			</View>

		</View>
  )
}

export const style = StyleSheet.create({

	inputView:{
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

  input: {
		flex: 1,
    fontSize: 16,
		fontFamily: 'Inter_400Regular',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 30,
  },

	icon: {
		width: 30,
		alignItems: 'center',
	}

})
