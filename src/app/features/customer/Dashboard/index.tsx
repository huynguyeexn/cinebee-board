import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ListCustomer from './components/ListCustomer';
import StatisticsChart from './components/StatisticsChart';
import StatisticsGroup from './components/StatisticsGroup';
import TopSpend from './components/TopSpend';

interface Props {}

const CustomerDashboard = (props: Props) => {
	const location = useLocation();

	console.log(location.pathname);

	return (
		<div>
			<StatisticsGroup />
			<Row className="mt-3">
				<Col sm={8}>
					<StatisticsChart />
				</Col>
				<Col sm={4}>
					{/* <Card className="mb-3">
						<Card.Body>
							<Form>
								<Form.Group className="m-0" controlId="formBasicEmail">
									<Form.Control
										title="Nhập mã khách hàng, email hoặc số điện thoại"
										type="email"
										placeholder="Nhập mã khách hàng, email hoặc số điện thoại"
									/>
									<Button className="mt-2" block>
										Tìm
									</Button>
									<Button
										variant="outline-primary"
										block
										as={NavLink}
										to={'/admin/customers/create'}
									>
										Đăng ký mới
									</Button>
								</Form.Group>
							</Form>
						</Card.Body>
					</Card> */}
					<TopSpend />
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<ListCustomer />
				</Col>
			</Row>
		</div>
	);
};

export default CustomerDashboard;
