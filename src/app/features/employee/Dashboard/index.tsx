import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { employeeActions, selectEmployeeList } from '../Redux/employeeSlice'
import { EmployeeStatisticsGroup } from './components/StatisticsGroup';
import { EmployeeStatisticsChart } from './components/StatisticsChart';
import EmployeeTopSpend from './components/TopSpend';
import { ListEmployee } from './components/list';

interface Props {
    
}
const EmployeeDashboard = (props: Props) => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectEmployeeList);
    console.log(list);
    
    useEffect(() => {
        dispatch(
            employeeActions.fetchEmployeeList({
                page: 1,
                per_page: 10,
            })
        );
    }, [dispatch])
    return (
        <div>
            <EmployeeStatisticsGroup />
			<Row className="mt-3">
				<Col sm={8}>
					<EmployeeStatisticsChart />
				</Col>
				<Col sm={4}>
					<Card className="mb-3">
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
					</Card>
					<EmployeeTopSpend />
				</Col>
			</Row>
			<Row className="mt-3">
				<Col  sm={12}>
					<ListEmployee listEmployee={list}/>
				</Col>
			</Row>
        </div>
    )
}

export default EmployeeDashboard;