import { Button, Dropdown, Popconfirm, Space, Spin } from 'antd';
import { customerActions, selectCustomerMap } from 'app/features/customer/redux/customerSlice';
import { employeeActions, selectEmployeeMap } from 'app/features/employee/redux/employeeSlice';
import { paymentStatusActions, selectPaymentStatusMap } from 'app/features/paymentStatus/redux/paymentStatusSlice';
import { Payment } from 'app/interfaces'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase';
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { paymentActions, selectPaymentFilter, selectPaymentList, selectPaymentListLoading, selectPaymentPagination } from '../../redux/paymentSlice';

interface Props {
}

export const ListPayment = (prop: Props) => {
    const dispatch = useAppDispatch();
    const payment = useAppSelector(selectPaymentList);
    const pagination = useAppSelector(selectPaymentPagination);
    const loading = useAppSelector(selectPaymentListLoading);
    const filter = useAppSelector(selectPaymentFilter);
	const employee = useAppSelector(selectEmployeeMap);
	const customer = useAppSelector(selectCustomerMap);
	const paymentStatus = useAppSelector(selectPaymentStatusMap);
	console.log(paymentStatus);
	
	
    React.useEffect(() => { 
        dispatch(paymentActions.getList(filter))
    },[dispatch, filter]);

	React.useEffect(() => {
		dispatch(employeeActions.fetchEmployeeList({
			per_page: 100
		}));
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(customerActions.getList({
			per_page: 100
		}));
	}, [dispatch]);

	React.useEffect(() => {
		dispatch(paymentStatusActions.getList({}));
	}, [dispatch]);


    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize,
        };

        dispatch(paymentActions.setFilter(newFilter));
    };

    const handleDelete = (payment: Payment) => {
        dispatch(paymentActions.deleteById(payment))
    };
    
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Ngày',
			dataIndex: 'booking_at',
			key: 'booking_at',
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'payment_status_id',
			key: 'payment_status_id',
			render: (id: number) => (
				<>
					<span>
						{Object.keys(paymentStatus).length !== 0 ? (
							paymentStatus[`${id}`]?.name
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
		},
		{
			title: 'Nhân Viên',
			dataIndex: 'employee_id',
			key: 'employee_id',
			render: (id: number) => (
				<>
					<span>
						{Object.keys(employee).length !== 0 ? (
							employee[`${id}`]?.fullname
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer_id',
			key: 'customer_id',
			render: (id: number) => (
				<>
					<span>
						{Object.keys(customer).length !== 0 ? (
							customer[`${id}`]?.fullname
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
		},
		{
			title: 'Vé Combo',
			dataIndex: 'combo_ticket_id',
			key: 'combo_ticket_id',
		},
		{
			title: 'Vé Xem Phim',
			dataIndex: 'movie_ticket_id',
			key: 'movie_ticket_id',
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: Payment) => (
				<Dropdown
					overlay={
						<Space size="middle">
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
			<TableBase
				columns={columns}
				dataSource={payment}
				loading={loading}
				onPageChange={handlePageChange}
				pagination={pagination}
			/>
		</>
    )
}
