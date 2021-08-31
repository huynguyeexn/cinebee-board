import { menus } from 'app/router/menu';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';
import { NavLink, useHistory } from 'react-router-dom';

const SideMenu = () => {
	const history = useHistory();

	const onLogoutClick = () => {
		localStorage.removeItem('access_token');
		history.push('/login');
	};

	return (
		<div className="sidebar text-center">
			<div className="logo">
				<h3>Cinebee</h3>
			</div>
			<Nav className="flex-column sidebar-menu ">
				{menus.map((link, idx) => (
					<Nav.Item key={idx}>
						<Nav.Link to={link.path} as={NavLink}>
							{React.createElement(link.icon, { className: 'icon' })} {link.label}
						</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<div className="sidebar-footer">
				<Button variant="outline-primary btn-block mt-auto" onClick={onLogoutClick}>
					Logout <FiLogOut />
				</Button>
			</div>
		</div>
	);
};

export default SideMenu;
