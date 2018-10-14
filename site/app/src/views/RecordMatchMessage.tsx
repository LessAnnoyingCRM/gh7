import { inject } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { MatchStore } from '../stores/matches';

interface NavParams {
	UserID: string
}
interface Props {
	MatchStore: MatchStore,
	navigation: NavigationScreenProp<{}, NavParams>
};
interface State {};

@inject('MatchStore')
export default class RecordMatchMessage extends React.Component<Props, State> {
	SendLike = () => {
		const UserID = this.props.navigation.getParam("UserID", "");
		this.props.MatchStore.HandleResponse("Like", UserID);
		this.props.navigation.navigate("Matches");
	}

	render = () => {
		return (
			<View style={styles.container}>
				<Text>Record your message!</Text>
				<TouchableHighlight onPress={() => this.SendLike()}>
					<Text>Message recorded, go back!</Text>
				</TouchableHighlight> 
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
	}
});