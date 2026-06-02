import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './screens/Login';
import { style } from './styles';
import { useFonts, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

export default function App() {

		const [fontsLoaded] = useFonts({
			Inter_400Regular,
			Inter_500Medium,
		})

		if (!fontsLoaded) {
			return null
		}

  return (
    <View style={style.container}>
	    <Login/>
	    <StatusBar style='auto'/>
    </View>
  );
}
