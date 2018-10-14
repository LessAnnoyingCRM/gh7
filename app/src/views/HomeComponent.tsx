/**
 * TODO:
 * Implement the actual home screen / landing page for the app
 */

import * as React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
// import Background from '../HomeBackground.jpeg';

type Props = {
	navigation: NavigationScreenProp<{}, {}>
};
export default class HomeComponent extends React.Component<Props> {
	render() {
		const { navigate } = this.props.navigation;
		const HomeBackground = 'https://upload.wikimedia.org/wikipedia/commons/4/40/Italian_Risotto.png';
		// const HomeBackground = 'https://s3.amazonaws.com/gh7/images/assets/home_background.jpg';
		const Overlay = 'https://s3.amazonaws.com/gh7/images/assets/home_overlay.png';
		return (
			// require('../HomeBackground.jpeg')
			<ImageBackground source={require('../HomeBackground.jpeg')} style={{width: '100%', height: '100%'}} >
			
			<View style={styles.container}>
				<View style={{marginTop: 90, padding:15, backgroundColor: '#00000080'}}>
					<Text style={styles.WelcomeHome}>WELCOME HOME</Text>
					<Text style={styles.SubTitle}>Forge unbreakable bonds over unforgettable meals</Text>
				</View>
				
				{/* <TouchableHighlight onPress={() => navigate("Max2tches")}>
					<Text>Go to Matches</Text> 
				</TouchableHighlight> */}

				<View style={styles.HomeFooter}>
					<TouchableHighlight>
						<View style={styles.GuestSignUp}>
							<Text style={styles.GuestSignUpText}>I’M NEW TO ST. LOUIS</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight>
						<View style={styles.HostSignUp}>
							<Text style={styles.HostSignUpText}>I want to host my new neighbors</Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			// justifyContent: 'center',
			alignItems: 'center',
			// backgroundColor: '#7DB66F',
			// flexDirection: 'column',
		},
		WelcomeHome: {
			fontSize: 40,
			fontWeight: 'bold',
			lineHeight: 45,
			letterSpacing: 3.3,
			textAlign: 'center',
			color: '#fff',
		},
		SubTitle: {
			textAlign: 'center',
			fontSize: 24,
			fontWeight: '100',
			lineHeight: 29, 
			color: '#fff',
			marginTop: 6,
		},
		HomeFooter: {
			position: 'absolute',
			bottom: 0,
			width: '100%',
		},
		GuestSignUp: {
			backgroundColor: '#D78B47',
			height: 75,
			marginBottom: 0,
			justifyContent: 'center',
		},
		HostSignUp: {
			backgroundColor:'#00000099',
			height: 40,
			justifyContent: 'center',
		},
		GuestSignUpText: {
			fontSize: 20,
			color: '#fff',
			textAlign: 'center',
		},
		HostSignUpText: {
			fontSize: 15,
			color: '#fff',
			textAlign: 'center',
		},
});
