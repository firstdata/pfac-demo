import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Finish from './pages/Finish';

class Routes extends Component {
	render() {
		return (
			<BrowserRouter basename={'/'}>
				<div>
					<Switch>
						<Route exact path="/" component={Signup} name="Signup" />
						<Route exact path="/signup" component={Signup} name="Signup" />
						<Route exact path="/finish" component={Finish} name="Finish" />
						<Redirect exact from="/" to="/signup" />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default Routes;
