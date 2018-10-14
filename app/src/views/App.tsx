import * as React from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import Stores from '../stores/index';
import PubNubReact from 'pubnub-react';
import {Alert} from 'react-native';
const PushNotification = require('react-native-push-notification');

type Props = {}
export default class App extends React.Component<Props> {
	
	constructor (props) {
		super(props)
		this.pubnub = new PubNubReact({publishKey: 'pub-c-aabad893-7c84-46c0-bb31-cd2d9d6dfc6b', subscribeKey: 'sub-c-dfaad8ba-cf6e-11e8-bbf2-f202706b73e5'})
		this.pubnub.init(this);
	}
	
	componentWillMount () {
		PushNotification.configure({
			
			onRegister: (token) => {
				this.pubnub.push.addChannels(
				{
					channels: ['notifications'],
					device: token.token,
					pushGateway: 'gcm' // apns, gcm, mpns
				});
			},
			
			onNotification: (notification) => {
				console.log( 'NOTIFICATION:', notification );
			},
			
			senderID: "106089739931",
			
		});
	}
	
	render() {
		return (
				<Provider {...Stores}>
					<Router />
				</Provider>
		);
	}
}