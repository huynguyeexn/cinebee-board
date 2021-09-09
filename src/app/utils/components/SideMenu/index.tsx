import { menus } from 'app/router/menu';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useState } from 'react';

const SIDE_MENU = () => {
	const history = useHistory();

	const onLogoutClick = () => {
		localStorage.removeItem('access_token');
		history.push('/login');
	};
	const [collapse, setCollase] = useState(false);

	const sidebarToggle = () => {
		setCollase(!collapse);
	};

	return (
		<div
			className={`border-right p-0 side-menu-wrapper ${
				collapse ? 'side-menu-collapse' : ''
			}`}
		>
			<div className="sidebar text-center">
				<div className="logo">
					<h3 className="tw-text-2xl tw-font-bold mb-3">Cinebee</h3>
				</div>
				<div className="tw-text-2xl tw-font-bold mb-3 collapse-logo">C</div>
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
			<div className="toggle-sidebar" onClick={sidebarToggle}>
				{collapse ? <BiChevronRight /> : <BiChevronLeft />}
			</div>
		</div>
	);
};

export default SIDE_MENU;
