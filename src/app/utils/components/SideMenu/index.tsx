import { Menu } from 'antd';
import { menus } from 'app/router/menu';
import { routers } from 'app/router/';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getUserPermissions, hasPermission } from 'app/utils/Account';

const SideMenu = () => {
	const location = useLocation();
	const currentRoute = location.pathname;

	const active = menus.find((x) => currentRoute.includes(x.path))?.path;

	const menuMap = menus.map((x) => {
		const permissions = routers.find((route) => route.path === x.path)?.permissions;

		return {
			...x,
			permissions,
		};
	});
	const isHidden = (permissions?: string[]) => {
		const userPermissions = getUserPermissions();

		if (!permissions) return false;
		return userPermissions && hasPermission(userPermissions, permissions);
	};

	return (
		<Menu theme="light" mode="inline" selectedKeys={[active || '']}>
			{menuMap.map((link, idx) => {
				return (
					isHidden(link.permissions) && (
						<Menu.Item key={link.path} icon={React.createElement(link.icon, { className: 'icon' })}>
							<NavLink to={link.path}>
								<span className="link-text">{link.label}</span>
							</NavLink>
						</Menu.Item>
					)
				);
			})}
		</Menu>
	);
};

export default SideMenu;
