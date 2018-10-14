import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import MatchCard from './MatchCard';
import { Match } from '../types/match';
import { MatchStore } from '../stores/matches'
// TODO: Grab matches from MobX store (and figure out what our data model should look like)
type NavigationProps = {
	Matches: Match[]
};
type Props = {
	MatchStore: MatchStore
	navigation: NavigationScreenProp<{}, NavigationProps>
};
type State = {};
@inject('MatchStore')
@observer
export default class MatchContainer extends React.Component<Props, State> {

	OnMatchLike = (UserID: string, Name:string, navigate: any) => {
		this.props.MatchStore.HandleResponse("Like", UserID);
		navigate("Record", { UserID: UserID, Name: Name });
	}

	OnMatchDislike = (UserID: string, navigate: any) => {
		// TODO: render next match
		this.props.MatchStore.HandleResponse("Dislike", UserID);
		navigate("Matches");
	}

	render (): JSX.Element | null {
		if (this.props.MatchStore) {
			const Matches = this.props.MatchStore.Matches;
			if (Matches.length < 1) {
				return (
					<View style={styles.container}>
						<Text style={styles.text}>
							You've gone through all your matches for the day.
						</Text>
						<Text style={styles.text}>
							Check back tomorrow for more!
						</Text>
					</View>
				);
			}
			const ActiveMatch = Matches[0];

			//generate a pairing of cover photo and profile pic
			const UserNumberFood = ActiveMatch.OtherUserId % 17;
			const UserNumberPeople = ActiveMatch.OtherUserId % 23;
			ActiveMatch['CoverPhotoURL'] = `https://s3.amazonaws.com/gh7/images/food/${UserNumberFood}.jpg`;
			ActiveMatch['ProfilePictureURL'] = `https://s3.amazonaws.com/gh7/images/people/${UserNumberPeople}.jpg`;

			return (
				<View style={{ flex:1 }}>
					<MatchCard {...ActiveMatch} Active={true} OnLike={this.OnMatchLike} OnDislike={this.OnMatchDislike} navigation={this.props.navigation} />
				</View>
			)
		}
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		padding: 20
	},
	text: {
		fontFamily: 'Lato',
		fontSize: 24,
		lineHeight: 29,
		color: "#333",
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 20
	}
});