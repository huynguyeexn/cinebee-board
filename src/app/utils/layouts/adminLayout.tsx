import { Layout } from 'antd';
import PrivateRoute from 'app/router/privateRoute';
import { routers } from 'app/router/routers';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import TopHeader from '../components/Header';
import SideMenu from '../components/SideMenu';

const { Content, Sider } = Layout;

const AdminLayout = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<>
			<Layout style={{ minHeight: '100vh' }} id="admin-layout">
				<Sider
					trigger={null}
					breakpoint="sm"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					collapsible
					collapsed={collapsed}
					onCollapse={(collapsed) => setCollapsed(collapsed)}
				>
					<div className="logo">
						<span>Logo</span>
					</div>
					<SideMenu />
				</Sider>
				<Layout className="site-layout">
					<TopHeader collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
					<Content style={{ padding: '16px' }}>
						<div style={{ minHeight: 360 }}>
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
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default AdminLayout;
