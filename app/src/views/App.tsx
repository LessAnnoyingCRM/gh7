import * as React from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import Stores from '../stores/index';

type Props = {}
export default class App extends React.Component<Props> {
	render() {
		return (
				<Provider {...Stores}>
					<Router />
				</Provider>
		);
	}
}