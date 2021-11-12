import 'app/assets/styles/app.scss';
import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './features/auth/login/loginPage';
import AdminLayout from './utils/layouts/adminLayout';

moment.locale('vi');

function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/admin">
					<AdminLayout />
				</Route>
				<Redirect exact from="/" to="/login" />
				<Route path="*">Not found</Route>
			</Switch>
			<ToastContainer />
		</React.Fragment>
	);
}

export default App;
