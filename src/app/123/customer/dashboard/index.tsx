import { blue } from '@ant-design/colors';
import { Button, Col, Dropdown, Popconfirm, Row, Space, Spin } from 'antd';
import customerApi from 'app/api/customer';
import {
	customerTypeActions,
	selectCustomerTypeMap,
} from 'app/features/customerType/redux/customerTypeSlice';
import { Customer } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { parseElementObjectToDate } from 'app/utils/helper';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import {
	customerActions,
	selectCustomerFilter,
	selectCustomerList,
	selectCustomerListLoading,
	selectCustomerPagination,
} from '../redux/customerSlice';
import ListCustomer from './components/ListCustomer';
import ModalAddCustomer from './components/ModalAddCustomer';
import ModalEditCustomer from './components/ModalEditCustomer';
import { FiMoreHorizontal } from 'react-icons/fi';
import FilterCustomer from './components/FilterCustomer';

const CustomerDashboard = () => {
	const dispatch = useAppDispatch();
	const customers = useAppSelector(selectCustomerList);
	const loading = useAppSelector(selectCustomerListLoading);
	const pagination = useAppSelector(selectCustomerPagination);
	const filter = useAppSelector(selectCustomerFilter);
	const customerType = useAppSelector(selectCustomerTypeMap);

	const [isAdd, setIsAdd] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [customer, setCustomer] = React.useState<Customer | undefined>(undefined);

	React.useEffect(() => {
		dispatch(customerActions.getList(filter));
	}, [dispatch, filter]);

	React.useEffect(() => {
		dispatch(customerTypeActions.getAll());
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
			setCustomer(parseElementObjectToDate(data, 'birthday') as Customer);
			setIsEdit(true);
		} catch (error) {
			console.error('Failed to featch student details.', error);
		}
	};

	const handleCloseEdit = () => {
		setIsEdit(false);
		setCustomer(undefined);
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
							customerType[`${id}`]?.name
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
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: Customer) => (
				<Dropdown
					overlay={
						<Space size="middle">
							<Button
								type="text"
								style={{ color: blue[3] }}
								onClick={() => handleEdit(record)}
							>
								Sửa <AiOutlineEdit />
							</Button>
							<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
								<Button type="text" danger>
									Xóa <AiOutlineDelete />
								</Button>
							</Popconfirm>
						</Space>
					}
					trigger={['click']}
				>
					<Button style={{ margin: '0 auto' }}>
						<FiMoreHorizontal />
					</Button>
				</Dropdown>
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

			<ModalAddCustomer isModalVisible={isAdd} onCancel={() => setIsAdd(false)} />
			{customer && (
				<ModalEditCustomer
					isModalVisible={isEdit}
					onCancel={handleCloseEdit}
					customer={customer}
				/>
			)}
		</>
	);
};

export default CustomerDashboard;
