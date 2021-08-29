import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
	const history = useHistory();

	const onLoginClick = () => {
		localStorage.setItem('access_token', '123');
		history.push('/admin/dashboard');
	};

	return (
		<div>
			<Button onClick={onLoginClick}>Click here to login</Button>
		</div>
	);
};

export default LoginPage;
