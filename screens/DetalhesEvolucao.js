import { View, ScrollView, Text } from 'react-native'
import { style } from '../styles'
import CloseBtn from '../components/CloseButton'

export default function DetalhesEvolucao({route, navigation}) {

	const {evolucao} = route.params || {}

	return(
		<View style={style.container}>
		<View style={style.greenBorder}/>
			<CloseBtn iconName="chevron-left" onPress={() => navigation.goBack()}/>
			<View style={{width: '95%', height: '87%', top: '4%', paddingTop: 10}}>
				<ScrollView style={{width: '100%', height: '100%'}}>
					<Text style={style.f16r}>{evolucao}</Text>
				</ScrollView>
			</View>
		</View>
	)
}
