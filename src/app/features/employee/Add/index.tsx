import React from 'react';
import { Col, Row, Form, Card, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { BsArrowLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

interface Props {}

const AddEmployee = (props: Props) => {
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
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Đăng ký khách hàng mới</Card.Title>
						<Form>
							<Form.Group as={Row} className="mb-3" controlId="text">
								<Form.Label column sm="2">
									Họ tên
								</Form.Label>
								<Col sm="10">
									<Form.Control type="name" placeholder="Nguyễn Văn A..." />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="text">
								<Form.Label column sm="2">
									Username
								</Form.Label>
								<Col sm="10">
									<Form.Control type="name" placeholder="ANguyen" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="text">
								<Form.Label column sm="2">
									Password
								</Form.Label>
								<Col sm="10">
									<Form.Control type="name" placeholder="ANguyen" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Ngày tháng năm sinh
								</Form.Label>
								<Col sm="10">
									<Datetime
										initialValue={'31/12/1990'}
										timeFormat={false}
										dateFormat="DD/MM/YYYY"
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Số CMND
								</Form.Label>
								<Col sm="10">
									<Form.Control type="email" placeholder="311234567" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Email
								</Form.Label>
								<Col sm="10">
									<Form.Control type="email" placeholder="email@gmail.com" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Số điện thoại
								</Form.Label>
								<Col sm="10">
									<Form.Control type="email" placeholder="031234567" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Địa Chỉ
								</Form.Label>
								<Col sm="10">
									<Form.Control type="email" placeholder="031234567" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="email">
								<Form.Label column sm="2">
									Giới tính
								</Form.Label>
								<Col sm="10">
									<div className="mb-3">
										<Form.Check
											inline
											label="Nam"
											name="group1"
											type="radio"
											id={`inline-radio-1`}
											checked
										/>
										<Form.Check
											inline
											label="Nữ"
											name="group1"
											type="radio"
											id={`inline-radio-2`}
										/>
									</div>
								</Col>
							</Form.Group>
							<div className="d-flex justify-content-end">
								<Button variant="outline-danger mr-2" type="reset">
									Khôi phục form đăng ký
								</Button>
								<Button variant="primary" type="submit">
									Lưu tài khoản
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default AddEmployee;
