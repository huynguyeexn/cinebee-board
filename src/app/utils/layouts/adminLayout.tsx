import RoomAddPage from 'app/features/room/Add/roomAddPage';
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
				<Header></Header>
				<Container fluid={true} className="main-wrapper">
					<Row>
						<Col sm={2} className="border-right p-0 side-menu-wrapper">
							<SideMenu />
						</Col>
						<Col sm={10} className="main-content-wrapper">
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
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default AdminLayout;
