import { Tag } from 'antd';
import { ORDER_STATUS } from 'app/constants';
import { Customer } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import { numberToVND } from 'app/utils/helper';
import moment from 'moment';
import React from 'react';
import {
	orderActions,
	selectOrderFilter,
	selectOrderList,
	selectOrderListLoading,
	selectOrderPagination,
} from '../../redux/orderSlice';

interface Props {}

export const ListOrder = (props: Props) => {
	const dispatch = useAppDispatch();
	const order = useAppSelector(selectOrderList);
	const filter = useAppSelector(selectOrderFilter);
	const pagination = useAppSelector(selectOrderPagination);
	const loading = useAppSelector(selectOrderListLoading);

	React.useEffect(() => {
		dispatch(orderActions.getList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};
		dispatch(orderActions.setFilter(newFilter));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Tổng Tiền',
			dataIndex: 'total',
			key: 'total',
            render: (total: number) => {
                return numberToVND(total);
            }
		},
		{
			title: 'Ngày đặt',
			dataIndex: 'booking_at',
			key: 'booking_at',
			render: (text: string) => {
				return moment(text).format('DD/MM/YYYY - HH:mm');
			},
		},
		{
			title: 'Số vé',
			dataIndex: 'movieTickets',
			key: 'movieTickets',
            render: (text: any) => {
                return text.length;
            }
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer',
			key: 'customer',
            render: (cus: Customer) => {
                return cus.fullname
            }
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
            render: (status: number) => {
                const result = ORDER_STATUS.find(item => item.id === status);

                return<Tag color={result?.color}>{result?.name}</Tag>
            }
		},
	];
	return (
		<>
			<TableBase
				columns={columns}
				dataSource={order}
				loading={loading}
				onPageChange={handlePageChange}
				pagination={pagination}
			/>
		</>
	);
};
