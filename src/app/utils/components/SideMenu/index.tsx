import { menus } from 'app/router/menu';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
	return (
		<Nav className="flex-column side-bar-menu ">
			{menus.map((link, idx) => (
				<Nav.Item key={idx}>
					<Nav.Link to={link.path} as={NavLink}>
						{React.createElement(link.icon)} {link.label}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	);
};

export default SideMenu;
