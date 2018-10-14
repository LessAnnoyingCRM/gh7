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
			console.log("Result", Result);
			if(_.size(Result) > 0) {
				this.Conversations = Result;
			} else {
				this.Conversations = [];
			}
		});
	}

	saveMessage(MatchId, MessageUrl, DateSent){
		console.log("asdasdf", MatchId, MessageUrl, DateSent);
		console.log(this.Conversations);
		this.Conversations[MatchId]['Conversation'].push({
			MatchId: MatchId,
			Message: MessageUrl,
			DateSent: DateSent,
			MessageId: Math.random()*23480298342349809184234829084,
			FromUserId: 2
		});
	}
	
	InitStore = () => {
		this.GetConversations();
	}
	
}