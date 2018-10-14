/**
 * TODO:
 * Implement the actual home screen / landing page for the app
 */

import * as React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

type Props = {
	navigation: NavigationScreenProp<{}, {}>
};
export default class HomeComponent extends React.Component<Props> {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome Home!</Text>
				<TouchableHighlight onPress={() => navigate("Matches")}>
					<Text>Go to Matches</Text> 
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
		container: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#F5FCFF',
		},
		welcome: {
				fontSize: 20,
				textAlign: 'center',
				margin: 10,
		}
});
