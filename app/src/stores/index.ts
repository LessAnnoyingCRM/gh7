// This file should export all of the stores inside the stores dir, so that they can be fed to the provider.
import MatchStore from './matches';
import UserStore from './user';
export default {
	MatchStore: new MatchStore(),
	UserStore: new UserStore()
};