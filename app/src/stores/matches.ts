import { observable } from 'mobx';
import { Match } from '../types/match';
import Api from '../utils/api';
import _ from 'underscore';
import {Alert} from 'react-native';

export interface MatchStore {
	InitStore: () => void,
	CheckConnection: () => boolean
	GetPotentialMatches: () => Match[],
	HandleResponse: (Type: "Like" | "Dislike", UserID: string) => void
	HasConnection: boolean,
	Matches: Match[],
	PrimaryMatch: any
}

export default class Matches implements MatchStore {
	@observable HasConnection = false;
	@observable Matches: Match[] = [];
	@observable PrimaryMatch: any = false;

	constructor () {
		this.InitStore();
	}
	/**
	 * Checks to see if the User already has an active connection (host accepted a match)
	 */
	CheckConnection = () => {
		// THIS IS JUST AN EXAMPLE
		Api.Call("TestHelloWorld", {}).then((Result:any) => {
			console.log(Result);
		}).catch((err:any) => {
			console.log(err);
		});
		return false;
	}
	
	HandleResponse = (Type: "Like" | "Dislike", OtherUserId: string) => {
		Api.Call("HandleResponse", {OtherUserId: OtherUserId, Type: Type}).then((Result) => {
			// if(Result['NewMatch']){
			// 	Alert.alert("Match with UserId "+Result['NewMatch']);
			// 	// ? move into messaging?
			// } else {
				this.PrimaryMatch = this.Matches.shift();	
			// }
		});
	}

	GetPotentialMatches = () => {
		Api.Call("GetPotentialMatches", {}).then((Result) => {
			if(_.size(Result) > 0) {
				this.Matches = Result;
			}
		});
	}

	InitStore = () => {
		// TODO: make authstore & Check to make sure we're logged in
		this.HasConnection = this.CheckConnection();
		if (!this.HasConnection) {
			// Grab all matches
			this.GetPotentialMatches();
		}
	}
}