import { blue } from '@ant-design/colors';
import { Button, Popconfirm, Space } from 'antd';
import { Customer } from 'app/interfaces/customer';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
	customerActions,
	selectCustomerFilter,
	selectCustomerList,
	selectCustomerLoading,
	selectCustomerPagination,
} from '../../redux/customerSlice';

interface Props {}

const ListCustomer = (props: Props) => {
	const dispatch = useAppDispatch();
	const customers = useAppSelector(selectCustomerList);
	const loading = useAppSelector(selectCustomerLoading);
	const pagination = useAppSelector(selectCustomerPagination);
	const filter = useAppSelector(selectCustomerFilter);

	React.useEffect(() => {
		dispatch(customerActions.fetchCustomerList({}));
	}, [dispatch]);

	const handleDelete = (customer: Customer) => {
		dispatch(customerActions.deleteById(customer));
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
			// render: (id: number) => customerTypes.find((type) => type.id === id),
		},
		{
			title: 'Cập nhật',
			key: 'updated_at',
			dataIndex: 'updated_at',
			width: 100,
			render: (text: string) => <span>{moment(text).fromNow()}</span>,
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			render: (record: Customer) => (
				<Space size="middle">
					<Button
						type="default"
						icon={<AiOutlineEdit />}
						style={{ color: blue[3], borderColor: blue[3] }}
					>
						Sửa
					</Button>
					<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
						<Button type="default" danger icon={<AiOutlineDelete />}>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	const handlePageChange = (page: number, pageSize?: number) => {
		console.log(page, pageSize, pagination);

		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(customerActions.setFilter(newFilter));
	};

	return (
		customers && (
			<TableBase
				columns={columns}
				dataSource={customers}
				pagination={pagination}
				onPageChange={handlePageChange}
				loading={loading}
				isFilter={true}
			/>
		)
	);
};

export default ListCustomer;
