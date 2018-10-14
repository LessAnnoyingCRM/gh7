import * as React from 'react';
import _ from 'underscore';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import CommonStyles from '../styles';
import CheckboxFormX from 'react-native-checkbox-form';
import { NavigationScreenProp } from 'react-navigation';

// TODO: Get this data from somewhere else, not just fake data
const LangData: Language[] = [
	{
		Label: "English",
		Value: "english"
	},
	{
		Label: "Español",
		Value: "español"
	},
	{
		Label: "Francias",
		Value: "francias"
	}
];

interface Language {
	Label: string,
	Value: string,
	Checked?: boolean,
}
interface Props {
	LanguageData: Language[],
	navigation: NavigationScreenProp<any, any>
}
interface State {
	SearchTerm: string,
}

export default class LanguagePicker extends React.Component<Props, State> {
	state = {
		SearchTerm: "",
	}
	render (): JSX.Element {
		const { LanguageData } = this.props;
		const FilteredLanguageData = this.state.SearchTerm.length > 0 ? _.filter(LangData, (item: Language) => item.Value.indexOf(this.state.SearchTerm.toLowerCase()) >= 0) : LangData;
		return (
			<View style={Styles.Container}>
				<View style={{ justifyContent:"center", alignItems:"center" }}>
					<TextInput
						onChangeText={(Text: string) => this.setState({SearchTerm: Text})}
						value={this.state.SearchTerm}
						underlineColorAndroid="#aaaaaa"
						style={{ width:248, fontSize:22 }}
						placeholder="Add Languages"
						placeholderTextColor="#888888"
					/>
					<CheckboxFormX
						dataSource={FilteredLanguageData}
						itemShowKey="Label"
						itemCheckedKey="Checked"
						iconSize={26}
						iconColor="#999999"
						textStyle={{ fontSize: 20 }}
					/>
					<View style={Styles.Footer}>
						<TouchableHighlight
							// TODO: Make this navigate to the language rating screen
							onPress={() => this.props.navigation.navigate('Matches')}
						>
							<View style={CommonStyles.Button}>
								<Text style={CommonStyles.ButtonText}>CONTINUE</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		)
	}
}

const Styles = StyleSheet.create({
	Container: {
		alignItems: "center",
		marginTop: 150,
		fontFamily: "Lato",
		backgroundColor: "#ffffff"
	},
	Footer: {
		marginTop: 25,
		marginBottom: 50
	}
})