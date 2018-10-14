import { DrawerNavigator, DrawerNavigatorConfig } from 'react-navigation';

import HomeComponent from './HomeComponent';
import MatchContainer from './MatchContainer';
import Inbox from './message/Inbox';
import Conversation from './message/Conversation';
//import SideBar from './SideBar';
import RecordMessage from './message/RecordMessage';
import MessageSent from './message/MessageSent';

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
    //SideBar: { screen: SideBar },
    Record : { screen: RecordMessage },
    Confirmation : { screen: MessageSent }
}, NavOptions);