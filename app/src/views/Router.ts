import { DrawerNavigator, DrawerNavigatorConfig } from 'react-navigation';

import HomeComponent from './HomeComponent';
import MatchContainer from './MatchContainer';
import Inbox from './message/Inbox';
import Conversation from './message/Conversation';
import SideBar from './SideBar';
import LanguagePicker from './LanguagePicker';
//import SideBar from './SideBar';
import RecordMessage from './message/RecordMessage';
import MessageSent from './message/MessageSent';
import UserRating from './UserRating';
import RatingConfirmation from './RatingConfirmation';

const NavOptions: DrawerNavigatorConfig = {
    initialRouteName: 'Home',
   // contentComponent: SideBar
};

export default DrawerNavigator({
    Home: { screen: HomeComponent },
    Matches: { screen: MatchContainer },
    Current: { screen: Conversation },
    History: { screen: Inbox },
    Conversation: { screen: Conversation },
    // SideBar: { screen: SideBar },
    LanguagePicker: { screen: LanguagePicker },
    Record : { screen: RecordMessage },
    Confirmation : { screen: MessageSent },
    UserRating: { screen: UserRating },
    RatingConfirmation: { screen: RatingConfirmation }
}, NavOptions);