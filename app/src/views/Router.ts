import { DrawerNavigator, DrawerNavigatorConfig } from 'react-navigation';

import HomeComponent from './HomeComponent';
import MatchContainer from './MatchContainer';
import RecordMatchMessage from './RecordMatchMessage';
import Inbox from './message/Inbox';
import Conversation from './message/Conversation';
import SideBar from './SideBar';

const NavOptions: DrawerNavigatorConfig = {
    initialRouteName: 'Home',
    contentComponent: SideBar
};

export default DrawerNavigator({
    Matches: { screen: MatchContainer },
    RecordMatchMessage: { screen: RecordMatchMessage },
    Home: { screen: HomeComponent },
    Current: { screen: Conversation },
    History: { screen: Inbox },
    Conversation: { screen: Conversation },
    SideBar: { screen: SideBar }
}, NavOptions);