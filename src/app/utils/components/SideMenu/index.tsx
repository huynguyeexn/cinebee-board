import { menus } from 'app/router/menu';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
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
				<h3 className="tw-text-2xl tw-font-bold mb-3">Cinebee</h3>
				<div className="tw-text-2xl tw-font-bold mb-3 collapse-logo">C</div>
			</div>
			<Nav className="flex-column sidebar-menu ">
				{menus.map((link, idx) => (
					<Nav.Item key={idx}>
						<Nav.Link to={link.path} as={NavLink}>
							{React.createElement(link.icon, { className: 'icon' })}{' '}
							<span className="link-text">{link.label}</span>
						</Nav.Link>
					</Nav.Item>
				))}
			</Nav>
			<div className="sidebar-footer">
				<Button variant="outline-primary btn-block mt-auto" onClick={onLogoutClick}>
					Đăng xuất
				</Button>
			</div>
		</div>
	);
};

export default SideMenu;
