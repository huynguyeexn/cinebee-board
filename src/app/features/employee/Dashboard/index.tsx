import { blue } from "@ant-design/colors";
import { Button, Col, Popconfirm, Row, Space, Spin } from "antd";
import employeeApi from "app/api/employee";
import { employeeRoleActions, selectemployeeRoleMap } from "app/features/employeeRole/Redux/employeeRoleSlice";
import { Employee } from "app/interfaces/employee";
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
import moment from "moment";
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { employeeActions, selectEmployeeFilter, selectEmployeeList, selectEmployeeLoading, selectEmployeePagination } from "../Redux/EmployeeSlice";
import FilterEmployee from "./components/FilterEmployee";
import ListEmployee from "./components/ListEmployee";
import ModalAddEditEmployee from "./components/ModalAddEditEmployee";


const EmployeeDashboard = () => {
	const dispatch = useAppDispatch();
	const employees = useAppSelector(selectEmployeeList);
	const loading = useAppSelector(selectEmployeeLoading);
	const pagination = useAppSelector(selectEmployeePagination);
	const filter = useAppSelector(selectEmployeeFilter);
	const employeeRole = useAppSelector(selectemployeeRoleMap);
    

	const [isModalOpen, setIsModalOpen] = React.useState(false);
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
		console.log(page, pageSize, pagination);

		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(employeeActions.setFilter(newFilter));
	};

	const handleAddButtonClick = () => {
		setEmployee(undefined);
		setIsModalOpen(true);
	};

	const handleDelete = (employee: Employee) => {
		dispatch(employeeActions.deleteById(employee));
	};

	const handleEdit = async (value: Employee) => {
		setEmployee(undefined);
		if (!value) return;
		const response: Employee = await employeeApi.getById(value);
		setEmployee(response);

		setIsModalOpen(true);
	};

	const handleModelSave = () => {
		console.log(`handleModelSave`);
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
			title: 'Hạng',
			key: 'employee_role_id',
			dataIndex: 'employee_role_id',
			width: 150,
			render: (id: number) => (
				<>
					<span>
						{Object.keys(employeeRole).length !== 0 ? (
							employeeRole[`${id}`].name
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
			{isModalOpen && (
				<ModalAddEditEmployee
					isModalVisible={isModalOpen}
					onCancel={() => setIsModalOpen(false)}
					onOk={handleModelSave}
					dataField={employee}
				/>
			)}
		</>
	);
};

export default EmployeeDashboard;
