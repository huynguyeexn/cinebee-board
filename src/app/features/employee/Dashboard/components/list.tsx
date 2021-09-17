import { Employee } from 'app/interfaces/employee'
import React from 'react'
import { Card, Table } from 'react-bootstrap'

interface Props {
    listEmployee?: Employee[];
}

export const ListEmployee = ({listEmployee}: Props) => {
    return (
        <div>
            <Card>
				<Card.Body>
					<Card.Title>Danh Sách Nhân Viên</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>FullName</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Birthday</th>
                            <th>Sex</th>
                            <th>Employee Role</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listEmployee && listEmployee.map((employee) => (
                            <tr>
                                <td>1</td>
                                <td>{employee.fullname}</td>
                                <td>{employee.username}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.birthday}</td>
                                <td>{employee.sex === 1 ? 'Nam' : 'Nam'}</td>
                                <td>{employee.employee_role_id === 1 ? 'Nhân Viên' : 'Quản Lý'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
				</Card.Body>
			</Card>
        </div>
    )
}
