import { Menu } from 'antd';
import { menus } from 'app/router/menu';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
	return (
		<Menu theme="dark" mode="inline">
			{menus.map((link, idx) => (
				<Menu.Item key={idx} icon={React.createElement(link.icon, { className: 'icon' })}>
					<NavLink to={link.path}>
						<span className="link-text">{link.label}</span>
					</NavLink>
				</Menu.Item>
			))}
		</Menu>
	);
};

export default SideMenu;
