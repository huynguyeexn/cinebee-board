import PrivateRoute from 'app/router/privateRoute';
import { routers } from 'app/router/routers';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SIDE_MENU from '../components/SideMenu';

const AdminLayout = () => {
	return (
		<React.Fragment>
			<div className="admin-layout">
				<div className="main-wrapper">
					<SIDE_MENU />
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
