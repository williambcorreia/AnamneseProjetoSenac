import React, { useState } from "react";
import { Text, TextInput, Image, View } from "react-native";
import { style } from "../styles";
import Logo from "../assets/pharmacy.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Login() {
		const [hidePassword, setHidePassword] = useState(true);
		const showPassword = () => {
			setHidePassword(!hidePassword)
		}

	return(
		<View style={style.container}>
		  <View style={style.greenBorder}/>

      <View style={style.loginTop}>
        <Image source={Logo} style={style.logo}/>
        <Text style={{fontSize: 30}}>Bem-Vindo!</Text>
      </View>

      <View style={style.loginMid}>
				<Text style={{fontSize: 16}}>Usuário</Text>
        <Input placeholder="Acesso do funcionário" iconName="user-alt"/>
				<Text style={{fontSize: 16}}>Senha</Text>
        <Input 
					placeholder="Código do funcionário" 
					iconName={hidePassword ? "eye-slash" : "eye"}
					iconPress={showPassword} 
					secureTextEntry={hidePassword}/>
      </View>

      <View style={style.loginBottom}>
				<Button title={"Entrar"}/>
				<Text style={{fontSize: 16}}>Não possui uma conta?
					<Text style={{fontSize: 16, color: 'dodgerblue'}}> Solicitar</Text>
				</Text>
      </View>
		</View>
	)
}
