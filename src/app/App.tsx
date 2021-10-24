import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'app/assets/styles/app.scss';
import LoginPage from './features/auth/login/loginPage';
import PrivateRoute from './router/privateRoute';
import AdminLayout from './utils/layouts/adminLayout';

import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work
moment.locale('vi');

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
			<ToastContainer />
		</React.Fragment>
	);
}

export default App;
