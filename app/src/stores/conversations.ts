import Api from '../utils/api';
import { observable } from 'mobx';
import {Alert} from 'react-native';
import _ from 'underscore';

export interface ConversationStore {
	InitStore: () => void,
	GetConversations: () => any,
	Conversations: any,
}

export default class Conversations implements ConversationStore {
	
	@observable Conversations: any = [];

	constructor () {
		this.InitStore();
	}
	
	GetConversations = () => {
		Api.Call("GetAllConversations", {}).then((Result) => {
			Alert.alert(JSON.stringify(Result));
			if(_.size(Result) > 0) {
				this.Conversations = Result;
			} else {
				this.Conversations = [];
			}
		});
	}
	
	InitStore = () => {
		this.GetConversations();
	}
	
}