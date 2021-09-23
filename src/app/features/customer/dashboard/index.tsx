import { blue } from '@ant-design/colors';
import { Button, Col, Popconfirm, Row, Space, Spin } from 'antd';
import customerApi from 'app/api/customer';
import {
	customerTypeActions,
	selectCustomerTypeMap,
} from 'app/features/customerType/redux/customerTypeSlice';
import { Customer } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import {
	customerActions,
	selectCustomerFilter,
	selectCustomerList,
	selectCustomerLoading,
	selectCustomerPagination,
} from '../redux/customerSlice';
import FilterCustomer from './components/FilterCustomer';
import ListCustomer from './components/ListCustomer';
import ModalAddCustomer from './components/ModalAddCustomer';
import ModalEditCustomer from './components/ModalEditCustomer';

const CustomerDashboard = () => {
	const dispatch = useAppDispatch();
	const customers = useAppSelector(selectCustomerList);
	const loading = useAppSelector(selectCustomerLoading);
	const pagination = useAppSelector(selectCustomerPagination);
	const filter = useAppSelector(selectCustomerFilter);
	const customerType = useAppSelector(selectCustomerTypeMap);

	const [isAdd, setIsAdd] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [customer, setCustomer] = React.useState<Customer | undefined>(undefined);

	React.useEffect(() => {
		dispatch(customerActions.fetchCustomerList(filter));
	}, [dispatch, filter]);

	React.useEffect(() => {
		dispatch(customerTypeActions.getAll());
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

		dispatch(customerActions.setFilter(newFilter));
	};

	const handleAddButtonClick = () => {
		setIsAdd(true);
	};

	const handleDelete = (customer: Customer) => {
		dispatch(customerActions.deleteById(customer));
	};

	const handleEdit = async (value: Customer) => {
		setCustomer(undefined);
		try {
			const data: Customer = await customerApi.getById(value);
			setCustomer(data);
			setIsEdit(true);
		} catch (error) {
			console.error('Failed to featch student details.', error);
		}
	};

	const handleAddSave = () => {
		console.log(`handleAddSave`);
	};

	const handleEditSave = () => {
		console.log(`handleEditSave`);
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
			key: 'customer_type_id',
			dataIndex: 'customer_type_id',
			width: 150,
			render: (id: number) => (
				<>
					<span>
						{Object.keys(customerType).length !== 0 ? (
							customerType[`${id}`].name
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
			render: (record: Customer) => (
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
					<FilterCustomer searchType={columns} />
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
					<ListCustomer
						columns={columns}
						pagination={pagination}
						loading={loading}
						customers={customers}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
			<ModalAddCustomer
				isModalVisible={isAdd}
				onCancel={() => setIsAdd(false)}
				onOk={handleAddSave}
			/>
			{customer && (
				<ModalEditCustomer
					isModalVisible={isEdit}
					onCancel={() => setIsEdit(false)}
					onOk={handleEditSave}
					customer={customer}
				/>
			)}
		</>
	);
};

export default CustomerDashboard;
