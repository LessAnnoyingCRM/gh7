import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import GuestMatchContainer from './GuestMatchContainer';
import HostMatchContainer from './host_matching/HostMatchContainer';
import { Match } from '../types/match';

type NavigationProps = {
	Matches: Match[]
};
interface Props {
	navigation: NavigationScreenProp<{}, NavigationProps>
}
@inject('UserStore')
@observer
export default class MatchContainer extends React.Component<any, any> {
	render () {
		if (this.props.UserStore.IsGuest()) {
			return <GuestMatchContainer navigation={this.props.navigation} />
		}
		return <HostMatchContainer navigation={this.props.navigation} />
	}
}