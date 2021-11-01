import { getCurrentUser, getUserPermissions, hasPermission } from 'app/utils/Account';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface IPrivateRoute extends RouteProps {
	permissions?: string[];
}

const PrivateRoute = (props: IPrivateRoute) => {
	// Check user is login
	const isLogin = Boolean(getCurrentUser());
	const userPermissions = getUserPermissions();

	const { permissions } = props;

	if (!isLogin) return <Redirect to="/login" />;
	if (!(userPermissions && permissions && hasPermission(userPermissions, permissions))) {
		return <Redirect to="/admin/403" />;
	}

	return <Route {...props} />;
};

export default PrivateRoute;
