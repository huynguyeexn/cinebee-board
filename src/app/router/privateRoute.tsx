import { getCurrentUser } from 'app/utils/Account';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute = (props: RouteProps) => {
	// Check user is login
	const isLogin = Boolean(getCurrentUser());
	if (!isLogin) return <Redirect to="/login" />;

	return <Route {...props} />;
};

export default PrivateRoute;
