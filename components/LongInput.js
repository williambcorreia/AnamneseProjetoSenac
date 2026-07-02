import React from "react";
import { TextInput, Text, StyleSheet, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LongInput({...props}){

  return (
		<View style={style.inputView}>
			<TextInput style={style.input} {...props}></TextInput>
		</View>
  )
}

export const style = StyleSheet.create({

	inputView:{
		flexDirection: 'row',
	},

  input: {
		flex: 1,
    fontSize: 16,
		fontFamily: 'Inter_400Regular',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 30,
		height: 480,
		textAlignVertical: 'top',
		paddingHorizontal: 10
  },

})
