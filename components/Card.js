import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function CardEvolucao ({ item, onPress }) {

	const dataFormatada = item?.criado_em 
		? new Date(item.criado_em).toLocaleString('pt-BR')
		: ""

	return(
		<TouchableOpacity style={style.card} onPress={onPress}>
			<Text style={style.nome}>{item?.paciente || 'Erro ao carregar nome'}</Text>
			<View style={style.separador}/>
			<Text style={style.texto} numberOfLines={4}>{item?.texto_evolucao || 'Erro ao carregar evolução'}</Text>
			<Text style={style.data}>{dataFormatada || 'Erro ao carregar data'}</Text>
		</TouchableOpacity>
	)
}

export const style = StyleSheet.create({

	card: {
		width: '94%',
		height: 150,
		alignSelf: 'center',
		borderWidth: 2,
		borderRadius: 30,
		borderColor: 'gray',
		paddingHorizontal: 10,
		paddingVertical: 5
	},

	separador: {
		width: '100%', 
		height: '1%', 
		backgroundColor: 'gray'
	},

	nome: {
    fontSize: 20,
		fontFamily: 'Inter_500Medium',
		marginBottom: 2
	},

	texto: {
    fontSize: 15,
		fontFamily: 'Inter_400Regular',
		marginBottom: 2
	},

	data: {
    fontSize: 15,
		fontFamily: 'Inter_400Regular',
		marginTop: 2
	}
})
