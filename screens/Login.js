import React, { useState } from "react";
import { Text, Image, View } from "react-native";
import { style } from "../styles";
import Logo from "../assets/pharmacy.png";
import Input from "../components/Input";
import Button from "../components/Button";

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
        <Text style={[style.f22m, {fontSize: 30}]}>Bem-vindo!</Text>
      </View>

      <View style={style.loginMid}>
				<Text style={style.f16r}>Usuário</Text>
        <Input placeholder="Ex: joaosilva" iconName="user-alt"/>
				<Text style={[style.f16r, {paddingTop: 10}]}>Senha</Text>
        <Input 
					placeholder="Ex: 1234@MairA!" 
					iconName={hidePassword ? "eye-slash" : "eye"}
					iconPress={showPassword} 
					secureTextEntry={hidePassword}/>
      </View>

      <View style={style.loginBottom}>
				<Button title={"Entrar"}/>
				<Text style={style.f16r}>Não possui uma conta?
					<Text style={[style.f16r, {color: 'dodgerblue'}]}> Solicitar</Text>
				</Text>
      </View>
		</View>
	)
}
