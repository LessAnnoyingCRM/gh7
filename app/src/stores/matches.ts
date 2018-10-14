import { observable } from 'mobx';
import { Match } from '../types/match';
import Api from '../utils/api';

export interface MatchStore {
	InitStore: () => void,
	CheckConnection: () => boolean
	GetMatches: () => Match[],
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

	GetMatches = () => {
		// TODO: Axios call to API
		return [
			{
				Name: "John Doe",
				Distance: "14.6",
				ProfilePictureURL: "http://networthcelebrities.com/wp-content/uploads/2015/11/Bernie-Sanders_6.jpg",
				CoverPhotoURL: "https://upload.wikimedia.org/wikipedia/commons/4/40/Italian_Risotto.png",
				UserID: "1234"
			},
			{
				Name: "Jane Doe",
				Distance: "4.2",
				ProfilePictureURL: "http://networthcelebrities.com/wp-content/uploads/2015/11/Bernie-Sanders_6.jpg",
				CoverPhotoURL: "http://www.ishwarcenter.org/images/newsletters/american-flag.png",
				UserID: "1234"
			},
			{
				Name: "Johnny Test",
				Distance: "24.5",
				ProfilePictureURL: "http://networthcelebrities.com/wp-content/uploads/2015/11/Bernie-Sanders_6.jpg",
				CoverPhotoURL: "http://www.ishwarcenter.org/images/newsletters/american-flag.png",
				UserID: "1234"
			},
			{
				Name: "John Doe",
				Distance: "14.6",
				ProfilePictureURL: "http://networthcelebrities.com/wp-content/uploads/2015/11/Bernie-Sanders_6.jpg",
				CoverPhotoURL: "http://www.ishwarcenter.org/images/newsletters/american-flag.png",
				UserID: "1234"
			},
		]
	}

	InitStore = () => {
		// TODO: make authstore & Check to make sure we're logged in
		this.HasConnection = this.CheckConnection();
		if (!this.HasConnection) {
			// Grab all matches
			this.Matches = this.GetMatches();
		}
	}
}