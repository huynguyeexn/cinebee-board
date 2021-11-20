import { Layout, Spin } from 'antd';
import Page403 from 'app/features/common/403';
import PrivateRoute from 'app/router/privateRoute';
import { routers } from 'app/router/routers';
import { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import TopHeader from '../components/Header';
import SideMenu from '../components/SideMenu';
import logo from 'app/assets/images/Cinebee-logo-text.png';

const { Content, Sider } = Layout;

const AdminLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<>
			<Layout style={{ minHeight: '100vh' }} id="admin-layout">
				<Sider
					className="admin-side-bar"
					breakpoint="md"
					collapsedWidth="0"
					collapsible
					theme="light"
					collapsed={collapsed}
					onCollapse={(collapsed) => setCollapsed(collapsed)}
				>
					<div className="logo">
						<img src={logo} alt="Cinebee logo" />
					</div>
					<SideMenu />
				</Sider>
				<Layout className="site-layout">
					<TopHeader />
					<Content className="site-content">
						<div style={{ minHeight: 360 }}>
							<Suspense fallback={<Spin></Spin>}>
								<Switch>
									{routers.map((route, idx) => (
										<PrivateRoute
											key={idx}
											exact
											path={route.path}
											component={route.component}
											permissions={route?.permissions}
										></PrivateRoute>
									))}

									{/* <PrivateRoute path="/admin/rooms" component={RoomAddPage}></PrivateRoute> */}
									<Redirect exact from="/" to="/admin/dashboard" />
									<Redirect exact from="/admin" to="/admin/dashboard" />

									<Route path="/admin/403" component={Page403} exact />
									<Route path="*">Not found</Route>
								</Switch>
							</Suspense>
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default AdminLayout;
