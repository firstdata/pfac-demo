import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import Signup from './pages/Signup';
import Agreement from './pages/Agreement';
import Finish from './pages/Finish';

class Routes extends Component {
	render() {
		return (
			<BrowserRouter basename={'/'}>
				<div>
					<Layout>
						<Switch>
							<Route exact path="/" component={Signup} name="Signup" />
							<Route exact path="/signup" component={Signup} name="Signup" />
							<Route exact path="/agreement" component={Agreement} name="Agreement" />
							<Route exact path="/finish" component={Finish} name="Finish" />
							<Redirect exact from="/" to="/signup" />
						</Switch>
					</Layout>
				</div>
			</BrowserRouter>
		);
	}
}

export default Routes;
