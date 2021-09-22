import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import ListCustomer from './components/ListCustomer';

interface Props {}

const CustomerDashboard = (props: Props) => {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col sm={24} md={12} lg={6}>
					<Card>
						<Statistic title="Active Users" value={112893} />
					</Card>
				</Col>

				<Col sm={24} md={12} lg={6}>
					<Card>
						<Statistic title="Active Users" value={112893} />
					</Card>
				</Col>

				<Col sm={24} md={12} lg={6}>
					<Card>
						<Statistic title="Active Users" value={112893} />
					</Card>
				</Col>

				<Col sm={24} md={12} lg={6}>
					<Card>
						<Statistic title="Active Users" value={112893} />
					</Card>
				</Col>
				<Col span={24}>
					<ListCustomer />
				</Col>
			</Row>
		</>
	);
};

export default CustomerDashboard;
