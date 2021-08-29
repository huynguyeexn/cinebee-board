import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './features/auth/login/loginPage';
import PrivateRoute from './router/privateRoute';
import AdminLayout from './utils/layouts/adminLayout';

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<PrivateRoute path="/admin">
					<AdminLayout />
				</PrivateRoute>
				<Redirect exact from="/" to="/login" />
				<Route path="*">Not found</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;
