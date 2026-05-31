import React from "react";
import { TextInput, Text, StyleSheet, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Input({iconName, iconPress, ...props}){
  return (
		<View style={style.inputView}>
			<TextInput style={style.input} {...props}></TextInput>
		{iconPress ? (
			<Pressable onPress={iconPress} style={({ pressed }) => ({
				opacity: pressed ? 0.3 : 1
			})}>
				<FontAwesome5 name={iconName} size={30} color='black'/>
			</Pressable> ) : (
				<FontAwesome5 name={iconName} size={30} color='black'/>
			)
		}
		</View>
  )
}

export const style = StyleSheet.create({

	inputView:{
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

  input: {
		flex: 1,
    fontSize: 20,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 12,
    width: 250,
  },
})
