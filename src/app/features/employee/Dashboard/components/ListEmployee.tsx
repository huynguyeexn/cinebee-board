import StudentFilter from 'app/features/customer/Dashboard/components/StudentFilter';
import { ListParams } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { LOADING } from 'app/utils/components/Loading';
import { PAGINATION } from 'app/utils/components/Pagination';
import React, { useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
import { 
    employeeActions, 
    selectEmployeeFilter, 
    selectEmployeeList, 
    selectEmployeeLoading, 
    selectEmployeePagination 
} from '../../Redux/employeeSlice';

interface Props {}

const ListEmployee = (props: Props) => {
    const dispatch = useAppDispatch();
    const listEmployee = useAppSelector(selectEmployeeList);
	const pagination = useAppSelector(selectEmployeePagination);
	const filter = useAppSelector(selectEmployeeFilter);
	const loading = useAppSelector(selectEmployeeLoading);

    useEffect(() => {
        dispatch(
            employeeActions.setFilter({
                page: 1,
                per_page: 10,
            })
        );
    }, [dispatch])

	const handlePageChange = (page: number) => {
		const newFilter = {
			...filter,
			page: page,
		};
		dispatch(employeeActions.setFilter(newFilter));
	};

	const handleSeachChange = (newFilter: ListParams) => {
		dispatch(employeeActions.setFilterDebounce(newFilter));
	};

	const handleFilterChange = (newFilter: ListParams) => {
		dispatch(employeeActions.setFilter(newFilter));
	};
    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Danh sách Nhân Viên</Card.Title>
                </Card.Header>
				<Card.Body>
                    <StudentFilter
                        filter={filter}
                        onSeachChange={handleSeachChange}
                        onFilterChange={handleFilterChange}
                    />
                    <div className="mb-3">{loading && <LOADING />}</div>
                    <Table striped bordered hover size="sm">
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
                        {listEmployee && listEmployee.map((row, idx) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.fullname}</td>
                                <td>{row.username}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                                <td>{row.birthday}</td>
                                <td>{row.sex === 1 ? 'Nam' : 'Nam'}</td>
                                <td>{row.employee_role_id === 1 ? 'Nhân Viên' : 'Quản Lý'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
				</Card.Body>
                <Card.Footer>
                    <PAGINATION
                        page={pagination?.page}
                        totalPage={pagination?.last_page}
                        onPageChange={handlePageChange}
                    />
                </Card.Footer>
			</Card>
        </div>
    );
};

export default ListEmployee;
