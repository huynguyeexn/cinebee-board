import PrivateRoute from 'app/router/privateRoute';
import { routers } from 'app/router/routers';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

const AdminLayout = () => {
	return (
		<React.Fragment>
			<div className="admin-layout">
				<Container fluid={true} className="main-wrapper">
					<Row>
						<Col sm={4} lg={2} className="border-right p-0 side-menu-wrapper">
							<SideMenu />
						</Col>
						<Col sm={8} lg={10} className="main-content-wrapper p-0">
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
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default AdminLayout;
