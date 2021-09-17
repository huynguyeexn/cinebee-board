import { ListParams } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { LOADING } from 'app/utils/components/Loading';
import { PAGINATION } from 'app/utils/components/Pagination';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import {
	customerActions,
	selectCustomerFilter,
	selectCustomerList,
	selectCustomerLoading,
	selectCustomerPagination,
} from '../../Redux/customerSlice';
import StudentFilter from './StudentFilter';

interface Props {}

const ListCustomer = (props: Props) => {
	const dispatch = useAppDispatch();
	const customerList = useAppSelector(selectCustomerList);
	const pagination = useAppSelector(selectCustomerPagination);
	const filter = useAppSelector(selectCustomerFilter);
	const loading = useAppSelector(selectCustomerLoading);

	useEffect(() => {
		dispatch(
			customerActions.setFilter({
				page: 1,
				per_page: 20,
			})
		);
	}, [dispatch]);

	const handlePageChange = (page: number) => {
		const newFilter = {
			...filter,
			page: page,
		};
		dispatch(customerActions.setFilter(newFilter));
	};

	const handleSeachChange = (newFilter: ListParams) => {
		dispatch(customerActions.setFilterDebounce(newFilter));
	};

	const handleFilterChange = (newFilter: ListParams) => {
		dispatch(customerActions.setFilter(newFilter));
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title>Danh sách khách hàng</Card.Title>
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
							<th>Tên tài khoản</th>
							<th>Email</th>
							<th>Họ tên</th>
							<th>Số điện thoại</th>
							<th>Ngày sinh</th>
							<th>Giới tính</th>
							<th>Cập nhật</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{customerList &&
							customerList.map((row, idx) => (
								<tr key={row.id}>
									<td>{row.id}</td>
									<td>{row.username}</td>
									<td>{row.email}</td>
									<td>{row.fullname}</td>
									<td>{row.phone}</td>
									<td>{row.birthday}</td>
									<td>{row.sex}</td>
									<td>{moment(row.updated_at).fromNow()}</td>
									<td></td>
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
	);
};

export default ListCustomer;
