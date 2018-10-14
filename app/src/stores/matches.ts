import { observable } from 'mobx';
import { Match } from '../types/match';
import Api from '../utils/api';

export interface MatchStore {
	InitStore: () => void,
	CheckConnection: () => boolean
	GetPotentialMatches: () => Match[],
	HandleResponse: (Type: "Like" | "Dislike", UserID: string) => void
	HasConnection: boolean,
	Matches: Match[],
}

export default class Matches implements MatchStore {
	@observable HasConnection = false;
	@observable Matches: Match[] = [];

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
	
	HandleResponse = (Type: "Like" | "Dislike", UserID: string) => {
		if (Type === "Like") {
			// TODO: Call API and mark that we liked this match
			this.Matches.shift();
		} else {
			this.Matches.shift();
		}
	}

	GetPotentialMatches = () => {
		let PotentialMatches:any = {};
		Api.Call("GetPotentialMatches", {}).then((Result) => {
			if(_.count(Result['PotentialMatches']) > 0) {
				PotentialMatches = Result;
			}
		});

		return PotentialMatches;
	}

	InitStore = () => {
		// TODO: make authstore & Check to make sure we're logged in
		this.HasConnection = this.CheckConnection();
		if (!this.HasConnection) {
			// Grab all matches
			this.Matches = this.GetPotentialMatches();
		}
	}
}