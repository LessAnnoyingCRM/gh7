// This file should export all of the stores inside the stores dir, so that they can be fed to the provider.
import MatchStore from './matches';
import ConversationStore from './conversations'

export default {
	MatchStore: new MatchStore(),
	ConversationStore: new ConversationStore()
};