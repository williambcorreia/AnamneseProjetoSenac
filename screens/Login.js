import React, { useEffect, useState } from "react"
import { Text, Image, View, Alert } from "react-native"
import { style } from "../styles"
import Logo from "../assets/pharmacy.png"
import Input from "../components/Input"
import Button from "../components/Button"
import execQuery from "../database/execQuery.js"
import bcrypt from 'bcryptjs'

export default function Login({ navigation }) {

		const [user, setUser] = useState("")
		const [password, setPassword] = useState("")

		const [hidePassword, setHidePassword] = useState(true);

		const showPassword = () => {
			setHidePassword(!hidePassword)
		}

	const handleLogin = async () => {

		if (!user || !password) {
			Alert.alert("Erro", "Preencha todos os campos!")
			return
		}

		navigation.navigate("Carregamento", {text: "Tentando realizar login..."})

		try {
			const userRows = await execQuery(`SELECT * FROM usuarios WHERE nome_login = ?`, [user])

			if (!userRows.data || userRows.data.length === 0) {
				navigation.goBack()
				Alert.alert("Erro", "Usuário ou senha incorretos!")
				return
			}

			const dbHash = userRows.data[0].senha
			const hashCompare = await bcrypt.compare(password, dbHash)

			if (hashCompare) {
				const dbInfo = userRows.data[0]
				const userInfo = {
					id: dbInfo.id_usuario,
					nome: dbInfo.nome_completo,
					coren: dbInfo.coren,
					cargo: dbInfo.cargo
				}

				navigation.replace('HomeTabs', {userInfo})
			} else {
				Alert.alert("Erro", "Usuário ou senha incorretos!")
				navigation.goBack()
			}
		}
		
		catch (error) {
			navigation.goBack()
			Alert.alert("Erro", "Não foi possível realizar o login")
			console.log("Erro: ", error)
		}

	}

	return(
		<View style={style.container}>
		  <View style={style.greenBorder}/>

      <View style={style.loginTop}>
        <Image source={Logo} style={style.logo}/>
      </View>

      <View style={style.loginMid}>

				<Text style={style.f16r}>Usuário ou Email</Text>
        <Input 
					placeholder="exemplo@gmail.com" 
					placeholderTextColor='gray'
					iconName="user-alt" 
					iconSize={24}
					onChangeText={setUser} 
					value={user}/>

				<Text style={[style.f16r, {paddingTop: 10}]}>Senha</Text>
        <Input 
					placeholder="$enhaExemplo123" 
					placeholderTextColor='gray'
					color='black'
					iconName={hidePassword ? "eye-slash" : "eye"}
					iconSize={24}
					iconPress={showPassword} 
					secureTextEntry={hidePassword}
					value={password}
					onChangeText={setPassword}/>

      </View>

      <View style={style.loginBottom}>
				<Button title={"Entrar"} onPress={handleLogin}/>
				<Text style={style.f16r}>Não possui uma conta?
					<Text style={[style.f16r, {color: 'dodgerblue'}]}> Solicitar</Text>
				</Text>
      </View>
		</View>
	)
}
