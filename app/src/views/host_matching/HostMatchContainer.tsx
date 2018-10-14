import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import _ from 'underscore';
import { Match } from '../../types/match';
import { LanguageSkill } from '../../types/language';
import HostMatchBadge from './HostMatchBadge';

@inject('MatchStore')
@observer
export default class HostMatchCointainer extends React.Component<any, any> {
	render () {
		const { Matches } = this.props.MatchStore;
		if (!Matches || Matches.length === 0) {
			return (
				<View>
					<Text>You've gone through all your matches for the day.</Text>
					<Text>Check back tomorrow for more!</Text>
				</View>
			)
		}
		const MatchBadges = false;
		// const MatchBadges = _.map(Matches, (Match: Match) => <HostMatchBadge {...Match} NotInterested={false} />);
		const TestLanguageSkills: LanguageSkill[] = [
			{ Language: "english", Rating:5 },
			{ Language: "español", Rating:1}
		]
		const TestPropsForBadge = {
			Name: "Test Person",
			VoiceMessageURL: "https://s3.amazonaws.com/gh7/6.mp4",
			LanguageSkills: TestLanguageSkills,
			NotInterested: false
		}
		return (
			<View style={Styles.Container}>
				<View style={Styles.Title}>
					<Text style={Styles.TitleText}>TODAY'S MATCHES</Text>
				</View>
				<View style={{
					flex: 1,
					alignItems: "flex-start",
					height: MatchBadges ? 150 * MatchBadges.length : 150
				}}>
					<HostMatchBadge {...TestPropsForBadge} />
				</View>
				<View style={Styles.Footer}>
					<Text style={Styles.FooterText}>You only get three matches per day.</Text>
					<Text style={Styles.FooterText}>If more guests are a good fit, no problem!</Text>
					<Text style={Styles.FooterText}>Just come back tomorrow for more.</Text>
				</View>
			</View>
		)
	}
}

const Styles = StyleSheet.create({
	Container: {
		flex: 1,
	},
	Title: {
		flex: 1,
		marginTop: 33,
		alignItems: "center"
	},
	TitleText: {
		fontFamily: "Lato",
		fontSize: 30,
		letterSpacing: 2
	},
	Footer: {
		flex: 1,
		alignItems: "center",
		textAlign: "center",
		
	},
	FooterText: {
		fontSize: 18
	}
})