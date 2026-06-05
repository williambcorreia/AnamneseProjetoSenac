import React, { useEffect, useState } from "react";
import { Text, Image, View, Alert } from "react-native";
import { style } from "../styles";
import * as Crypt from 'expo-crypto'
import Logo from "../assets/pharmacy.png";
import Input from "../components/Input";
import Button from "../components/Button";
import Deploy from "../database/InitDB";

export default function Login() {

		const [user, setUser] = useState("")
		const [password, setPassword] = useState("")
		const [db, setDb] = useState(null)

		const [hidePassword, setHidePassword] = useState(true);

		const showPassword = () => {
			setHidePassword(!hidePassword)
		}

	useEffect(() => {
		async function connectDB() {
			const connection = await Deploy()
			if (connection === "err") {
				Alert.alert("Erro", "Não foi possível se conectar ao banco de dados")
			} else {
				setDb(connection)
			}
		}
		connectDB()
	}, [])
		

	const handleLogin = async () => {
		
		if (!user || !password) {
			Alert.alert("Erro", "Preencha todos os campos!")
			return
		}
		
		if (!db) {
			Alert.alert("Erro", "Banco de dados ainda não carregou!")
			return
		}

		try {
			const passwordCrypto = await Crypt.digestStringAsync(
				Crypt.CryptoDigestAlgorithm.SHA256, password
			)

			const userFound = await db.getFirstAsync(
				'SELECT * FROM users WHERE user = ? AND password = ?;',
				[user, passwordCrypto]
			)

			if (userFound) {
				Alert.alert(`${userFound.user} ${userFound.role}`)
			} else {
				Alert.alert("USUARIO OU SENHA INCORRETO")
			}
		}
		
		catch (error) {
			Alert.alert("NÃO LOGIN")
		}

	}

	return(
		<View style={style.container}>
		  <View style={style.greenBorder}/>

      <View style={style.loginTop}>
        <Image source={Logo} style={style.logo}/>
        <Text style={[style.f22m, {fontSize: 30}]}>Bem-vindo!</Text>
      </View>

      <View style={style.loginMid}>

				<Text style={style.f16r}>Usuário</Text>
        <Input 
					placeholder="Ex: joaosilva" 
					iconName="user-alt" 
					onChangeText={setUser} 
					value={user}/>

				<Text style={[style.f16r, {paddingTop: 10}]}>Senha</Text>
        <Input 
					placeholder="Ex: 1234@MairA!" 
					iconName={hidePassword ? "eye-slash" : "eye"}
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
