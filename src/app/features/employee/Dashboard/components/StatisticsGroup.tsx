import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { AiOutlineUser } from 'react-icons/ai'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'

interface Props {
    
}

export const EmployeeStatisticsGroup = (props: Props) => {
    return (
        <Row sm={1} md={2} lg={4}>
			<Col>
				<Card className="hover-shadow mt-3">
					<Card.Body className="widget-horizontal">
						<div className="avatar avatar__primary">
							<AiOutlineUser />
						</div>
						<div>
							<p className="mb-2 text-muted">
								<span>KH mua vé hôm nay</span>
							</p>
							<span className="h5 mr-2">14</span>
							<small className="text-success d-inline-flex align-items-center">
								<VscTriangleUp />
								+15%
							</small>
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col>
				<Card className="hover-shadow mt-3">
					<Card.Body className="widget-horizontal">
						<div className="avatar avatar__primary">
							<AiOutlineUser />
						</div>
						<div>
							<p className="mb-2 text-muted">
								<span>KH mua vé tháng này</span>
							</p>
							<span className="h5 mr-2">168</span>
							<small className="text-danger d-inline-flex align-items-center">
								<VscTriangleDown />
								-32%
							</small>
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col>
				<Card className="hover-shadow mt-3">
					<Card.Body className="widget-horizontal">
						<div className="avatar avatar__primary">
							<AiOutlineUser />
						</div>
						<div>
							<p className="mb-2 text-muted">
								<span>KH mua vé năm nay</span>
							</p>
							<span className="h5 mr-2">853</span>
							<small className="text-danger d-inline-flex align-items-center">
								<VscTriangleDown />
								-35%
							</small>
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col>
				<Card className="hover-shadow mt-3">
					<Card.Body className="widget-horizontal">
						<div className="avatar avatar__primary">
							<AiOutlineUser />
						</div>
						<div>
							<p className="mb-2 text-muted">
								<span>KH trên hệ thống</span>
							</p>
							<span className="h5 mr-2">1828</span>
							<small className="text-success d-inline-flex align-items-center">
								<VscTriangleUp />
								+2.5%
							</small>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
    )
}
