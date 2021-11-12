import { Button, Card, Col, Form, Input, Row } from 'antd';
import { UserLogin } from 'app/interfaces';
import { getCurrentUser, login } from 'app/utils/Account';
import React from 'react';
import { Redirect, useHistory } from 'react-router';

const LoginPage = () => {
	const history = useHistory();
	const [loading, setLoading] = React.useState(false);

	const isLogin = Boolean(getCurrentUser());
	if (isLogin) return <Redirect to="/admin" />;

	const onFinish = async (values: UserLogin) => {
		setLoading(true);
		const response = await login(values);
		if (response) {
			history.push('admin');
			return;
		}
		setLoading(false);
	};

	return (
		<Row
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<Col xs={20} sm={16} md={10} lg={6} xl={6}>
				<Card title="Đăng nhập hệ thống quản lý Cinebee">
					<Form
						name="login"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						autoComplete="off"
						layout="vertical"
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item>
							<Button block type="primary" htmlType="submit" loading={loading}>
								Login
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	);
};

export default LoginPage;
