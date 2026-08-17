import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

	container: {
		flex: 1,
    justifyContent:'center',
		alignItems:'center',
		backgroundColor: 'white',
		gap: 10
	},

  loginTop: {
    width: '80%',
    height: '25%',
		alignItems:'center',
    justifyContent:'center',
    gap: 20,
    marginTop: '10%',
		marginBottom: '5%'
  },

  loginMid: {
    width: '88%',
    height: '20%',
    justifyContent:'center',
    gap: 5,
		marginBottom: '20%',
  },

  loginBottom: {
    width: '85%',
    height: '15%',
		alignItems:'center',
    justifyContent:'flex-end',
		gap: 20,
		marginBottom: '15%'
  },

	draftContainer: {
		alignItems: 'center', 
		width: '90%', 
		gap: 30, 
		marginBottom: '10%', 
		height: '72%', 
	},
  
	greenBorder: {
		width: '100%',
		height: '4%',
		backgroundColor: 'mediumseagreen',
		position:'absolute',
		top: 0,
	},

	logo: {
		width: '100%',
		height: '130%',
	},

	f16r: {
		fontSize: 16,
		fontFamily: 'Inter_400Regular'
	},

	f22m: {
		fontSize: 22,
		fontFamily: 'Inter_500Medium'
	},

	legenda: {
		fontFamily: 'Inter_500Medium',
		position: 'absolute',
		top: '55%',
		width: '90%',
		maxHeight: '35%',
		alignSelf: 'center',
	},

})
