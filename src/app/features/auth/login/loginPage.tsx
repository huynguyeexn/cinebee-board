import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
	const history = useHistory();

	const onLoginClick = () => {
		localStorage.setItem('access_token', '123');
		history.push('/admin/dashboard');
	};

	return (
		<div>
			<button onClick={onLoginClick}>Click here to login</button>
		</div>
	);
};

export default LoginPage;
