import { blue } from '@ant-design/colors';
import { Button, Col, Popconfirm, Row, Space, Spin } from 'antd';
import employeeApi from 'app/api/employee';
import {
	employeeRoleActions,
	selectemployeeRoleMap,
} from 'app/features/employeeRole/redux/employeeRoleSlice';
import { Employee } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { parseElementObjectToDate } from 'app/utils/helper';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import {
	employeeActions,
	selectEmployeeFilter,
	selectEmployeeList,
	selectEmployeeListLoading,
	selectEmployeePagination,
} from '../redux/employeeSlice';
import FilterEmployee from './components/FilterEmployee';
import ListEmployee from './components/ListEmployee';
import ModalAddEmployee from './components/ModalAddEmployee';
import ModalEditEmployee from './components/ModalEditEmployee';
import StatisticEmployee from './components/StatisticEmployee';

const EmployeeDashboard = () => {
	const dispatch = useAppDispatch();
	const employees = useAppSelector(selectEmployeeList);
	const loading = useAppSelector(selectEmployeeListLoading);
	const pagination = useAppSelector(selectEmployeePagination);
	const filter = useAppSelector(selectEmployeeFilter);
	const employeeRole = useAppSelector(selectemployeeRoleMap);

	const [isAdd, setIsAdd] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [employee, setEmployee] = React.useState<Employee | undefined>(undefined);

	React.useEffect(() => {
		dispatch(employeeActions.fetchEmployeeList(filter));
	}, [dispatch, filter]);

	React.useEffect(() => {
		dispatch(employeeRoleActions.getAll());
	}, [dispatch]);

	/**
	 * Handle Event
	 */
	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(employeeActions.setFilter(newFilter));
	};

	const handleAddButtonClick = () => {
		setIsAdd(true);
	};

	const handleDelete = (employee: Employee) => {
		dispatch(employeeActions.deleteById(employee));
	};

	const handleEdit = async (value: Employee) => {
		setEmployee(undefined);
		try {
			const data: Employee = await employeeApi.getById(value);
			setEmployee(parseElementObjectToDate(data, 'birthday') as Employee);
			setIsEdit(true);
		} catch (error) {
			console.error('Failed to featch student details.', error);
		}
	};

	const handleCloseEdit = () => {
		setIsEdit(false);
		setEmployee(undefined);
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 80,
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'fullname',
			key: 'fullname',
		},
		{
			title: 'Tên tài khoản',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 150,
		},
		{
			title: 'Chức vụ',
			key: 'employee_role_id',
			dataIndex: 'employee_role_id',
			width: 150,
			render: (id: number) => (
				<>
					<span>
						{Object.keys(employeeRole).length !== 0 ? (
							employeeRole[`${id}`]?.name
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
		},
		{
			title: 'Cập nhật',
			key: 'updated_at',
			dataIndex: 'updated_at',
			width: 150,
			render: (text: string) => <span>{moment(text).fromNow()}</span>,
		},
		{
			title: 'Thao tác',
			key: 'action',
			fixed: 'right',
			width: 125,
			render: (record: Employee) => (
				<Space size="middle">
					<Button
						type="default"
						style={{ color: blue[3], borderColor: blue[3] }}
						onClick={() => handleEdit(record)}
					>
						<AiOutlineEdit />
					</Button>
					<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
						<Button type="default" danger>
							<AiOutlineDelete />
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<StatisticEmployee />
				</Col>
				<Col span={24}>
					<FilterEmployee searchType={columns} />
				</Col>
				<Col span={24}>
					<Button
						icon={<AiOutlinePlus />}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
						onClick={handleAddButtonClick}
					>
						Thêm tài khoản
					</Button>
				</Col>
				<Col span={24}>
					<ListEmployee
						columns={columns}
						pagination={pagination}
						loading={loading}
						employees={employees}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<ModalAddEmployee isModalVisible={isAdd} onCancel={() => setIsAdd(false)} />
			{employee && (
				<ModalEditEmployee
					isModalVisible={isEdit}
					onCancel={handleCloseEdit}
					employee={employee}
				/>
			)}
		</>
	);
};

export default EmployeeDashboard;
