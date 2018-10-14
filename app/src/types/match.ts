import { LanguageSkill } from './language';
export interface Match {
	Name: string,
	ProfilePictureURL: string,
	CoverPhotoURL: string,
	LanguageSkills?: LanguageSkill[],
	VoiceMessageURL?: string,	// Set for Hosts recieving matches from guests who have sent an initial voice message
	UserID: string,
	
}