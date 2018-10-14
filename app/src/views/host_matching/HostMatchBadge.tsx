import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { LanguageSkill } from '../../types/language';
import HostMatchBadgeLanguageSkills from './HostMatchBadgeLanguageSkills';

interface Props {
	Name: string,
	VoiceMessageURL: string,
	LanguageSkills: LanguageSkill[],
	NotInterested: boolean
}

export default class HostMatchBadge extends React.Component<Props, any> {
	render () {
		return (
				<ImageBackground source={{ uri:"http://i1.trekearth.com/photos/1577/st._louis_riverfront-1.jpg" }} style={Styles.TopContainer}>
					<View style={Styles.ProfileImage}>
						<Image 
							source={{
								uri:"http://blog.lakeside.com/wp-content/uploads/2014/08/Family-fun-3.jpg"
							}} 
							style={{ 
								width: 95,
								height: 95,
								borderRadius: 200,
								borderColor: "#9f9f9f",
								borderWidth: 1,
								// marginTop: -50,
								marginLeft: 15,
							}} 
						/>
					</View>
					<View style={Styles.NameAndAudio}>
						<View>
							<Text style={Styles.NameText}>Test Name</Text>
						</View>
						<View style={Styles.Audio}>
							<TouchableHighlight onPress={() => this.PlayMessage} underlayColor="rgba(255,255,255,0.4)">
								<Text style={Styles.PlayMessageButton}>   ></Text>
							</TouchableHighlight>
							<View style={{justifyContent:'center'}}><Text style={Styles.MessageLength}>{"1:15"}</Text></View>
						</View>
					</View>
				</ImageBackground>
		)
	}
}

const Styles = StyleSheet.create({
	MainBadge: {
	},
	MessageLength: {
		color: "#ffffff",
		justifyContent: 'flex-end',
		fontSize: 11,
		lineHeight: 14,
	},
	NameText: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "600"
	},
	NameAndAudio: {
		flex: 2,
		// textAlignVertical: "center",
	},
	PlayMessageButton: {
		backgroundColor: '#83C0EC',
		width: 30,
		height: 30,
		borderRadius: 30/2,

		justifyContent: 'flex-start',
		color: "#fff",
		lineHeight: 30,
		marginLeft: 5,
		marginRight: 5,
	},
	ProfileImage: {
		// alignItems: "flex-end",
		shadowOffset: { width: 10, height: 10 },
		shadowColor: 'black',
		shadowOpacity: 1,
		// elevation: 3,
		// backgroundColor : "#000",
		flex: 1
	},
	TopContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#000000",
		height: 150,
	},
	Audio: {
		// backgroundColor: '#000000',
		width: 250,
		height: 45,
		borderRadius: 9,
		color: '#ffffff',
		lineHeight: 28,
		padding: 6,
		margin: 6,
		marginLeft: -10,
		flexDirection: "row",
		justifyContent: "space-between",
	}
})