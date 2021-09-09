import PrivateRoute from 'app/router/privateRoute';
import { routers } from 'app/router/routers';
import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../components/SideMenu';

const AdminLayout = () => {
	const [collapse, setCollase] = useState(false);

	const sidebarToggle = () => {
		setCollase(!collapse);
	};

	return (
		<React.Fragment>
			<div className="admin-layout">
				<div className="main-wrapper">
					<div
						className={`border-right p-0 side-menu-wrapper ${
							collapse ? 'side-menu-collapse' : ''
						}`}
					>
						<SideMenu />
						<div className="toggle-sidebar" onClick={sidebarToggle}>
							{collapse ? <BiChevronRight /> : <BiChevronLeft />}
						</div>
					</div>
					<div className="main-content-wrapper p-0">
						<div className="main-content p-3">
							<Switch>
								{routers.map((route, idx) => (
									<PrivateRoute
										key={idx}
										exact
										path={route.path}
										component={route.component}
									></PrivateRoute>
								))}

								{/* <PrivateRoute path="/admin/rooms" component={RoomAddPage}></PrivateRoute> */}
								<Redirect exact from="/" to="/admin/dashboard" />
								<Redirect exact from="/admin" to="/admin/dashboard" />
								<Route path="*">Not found</Route>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default AdminLayout;
