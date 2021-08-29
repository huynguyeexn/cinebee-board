import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { AiOutlineUser } from 'react-icons/ai';

const DashboardPage = () => {
	return (
		<div>
			<Row sm={1} md={2} lg={4}>
				<Col>
					<Card>
						<Card.Body className="widget-horizontal">
							<div className="avatar avatar__primary">
								<AiOutlineUser />
							</div>
							<div className="text-center">
								<strong>123</strong>
								<div>Suất chiếu hôm nay</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body className="widget-horizontal">
							<div className="avatar avatar__primary">
								<AiOutlineUser />
							</div>
							<div className="text-center">
								<strong>123</strong>
								<div>Suất chiếu hôm nay</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body className="widget-horizontal">
							<div className="avatar avatar__primary">
								<AiOutlineUser />
							</div>
							<div className="text-center">
								<strong>123</strong>
								<div>Suất chiếu hôm nay</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body className="widget-horizontal">
							<div className="avatar avatar__primary">
								<AiOutlineUser />
							</div>
							<div className="text-center">
								<strong>123</strong>
								<div>Suất chiếu hôm nay</div>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardPage;
