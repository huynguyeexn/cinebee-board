import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

interface Props {}

const Header = (props: Props) => {
	const history = useHistory();

	const onLogoutClick = () => {
		localStorage.removeItem('access_token');
		history.push('/login');
	};

	return (
		<Navbar bg="light" variant="light" className="border-none">
			<Navbar.Brand>Cinebee</Navbar.Brand>
			<Nav className="mr-auto">
				<span>Xin chào HUi!</span>
			</Nav>
			<Button variant="outline-secondary" onClick={onLogoutClick}>
				Logout <FiLogOut />
			</Button>
		</Navbar>
	);
};

export default Header;
