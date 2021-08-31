import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosContact, IoMdPhonePortrait } from 'react-icons/io';
import { IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';
import { NavLink, useHistory } from 'react-router-dom';
import ActivityHistory from './Components/ActivityHistory';
import LoginHistory from './Components/LoginHistory';
interface Props {}

const DetailCustomer = (props: Props) => {
	const history = useHistory();

	const onBackClick = () => {
		history.goBack();
	};

	return (
		<Row>
			<Col sm={12} className="mb-3">
				<Button onClick={onBackClick}>
					<BsArrowLeft /> Quay về
				</Button>
			</Col>
			<Col sm={12} className="mb-3">
				<h3>Thông tin tài khoản khách hàng</h3>
			</Col>
			<Col sm={3}>
				<Card>
					<Card.Body>
						<Image
							src="https://picsum.photos/200/200"
							thumbnail
							className="mx-auto d-block"
						/>
						<div className="d-flex flex-column mt-3">
							<h4>Nguyễn Văn A</h4>
							<p>
								<IoIosContact /> 12837987395
							</p>
							<p>
								<IoMailOutline /> ABC****@gmail.com
							</p>
							<p>
								<IoMdPhonePortrait /> 09***99
							</p>
							<p>
								<NavLink to="change-pass">
									<IoLockClosedOutline /> Đổi mật khẩu
								</NavLink>
							</p>
						</div>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={9}>
				<LoginHistory className="mb-3" />
				<ActivityHistory />
			</Col>
		</Row>
	);
};

export default DetailCustomer;
