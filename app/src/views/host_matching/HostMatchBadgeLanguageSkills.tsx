import * as React from 'react';
import { Text, View } from 'react-native';
import _ from 'underscore';
import { LanguageSkill } from '../../types/language';

interface Props {
	LanguageSkills: LanguageSkill[]
}

export default class HostMatchBadgeLanguageSkills extends React.Component<Props, any> {
	render () {
		return (
			<View>
				{_.map(this.props.LanguageSkills, (Language: LanguageSkill) => {
					return (
						<View key={Language.Language}>
							<Text>
								{Language.Language}
							</Text>
							{/* TODO:: Generate flag based on language */}
							{/* TODO: STARS!!!! */}
						</View>
					)
				})}
			</View>
		)
	}
}