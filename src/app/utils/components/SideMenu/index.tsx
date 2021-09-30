import { Menu } from 'antd';
import { menus } from 'app/router/menu';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SideMenu = () => {
	const location = useLocation();
	const currentRoute = location.pathname;

	const activeRoute = menus.findIndex((link) => link.path === currentRoute);

	return (
		<Menu theme="light" mode="inline" defaultSelectedKeys={[`${activeRoute}`]}>
			{menus.map((link, idx) => {
				return (
					<Menu.Item
						key={idx}
						icon={React.createElement(link.icon, { className: 'icon' })}
					>
						<NavLink to={link.path}>
							<span className="link-text">{link.label}</span>
						</NavLink>
					</Menu.Item>
				);
			})}
		</Menu>
	);
};

export default SideMenu;
