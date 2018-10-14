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
		const HomeBackground = 'https://s3-alpha.figma.com/img/3b55/5d5a/3fa43b291c3792cb44c208ae856ed07e';
		return (
			<View style={styles.container}>
			
				{/* <Image source={{uri: HomeBackground}}/> */}
				<ImageBackground source={{uri: HomeBackground}} style={{width: '100%', height: '100%'}}>
			
					<Text style={styles.WelcomeHome}>WELCOME HOME</Text>
					<Text style={styles.SubTitle}>Forge unbreakable bonds over unforgettable meals</Text>

				</ImageBackground>
				<TouchableHighlight onPress={() => navigate("Matches")}>
					<Text>Go to Matches</Text> 
				</TouchableHighlight>

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
		);
	}
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			// justifyContent: 'center',
			// alignItems: 'center',
			// backgroundColor: '#7DB66F',
			flexDirection: 'column',
		},
		WelcomeHome: {
			fontSize: 35,
			fontWeight: 'bold',
			lineHeight: 45,
			letterSpacing: 3.3,
			textAlign: 'center',
			color: '#fff',
			marginTop: 90,
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
			backgroundColor: '#000',
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
