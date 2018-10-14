import { observable } from 'mobx';

export default class UserStore {
	@observable private _UserID:string = "";
	get UserID (): string {
		return this._UserID;
	}
	set UserID (NewUserID: string) {
		this._UserID = NewUserID;
	}

	IsGuest = (): boolean => {
		if (this.UserID === "1") {
			return true;
		}
		return false;
	}
}