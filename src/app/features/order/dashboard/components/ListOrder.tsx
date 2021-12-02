import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase'
import React from 'react'
import {orderActions, selectOrderFilter, 
        selectOrderList, 
        selectOrderListLoading, 
        selectOrderPagination 
} from '../../redux/orderSlice'

interface Props {
    
}

export const ListOrder = (props: Props) => {
    const dispatch = useAppDispatch()
    const order = useAppSelector(selectOrderList)
    const filter = useAppSelector(selectOrderFilter)
    const pagination = useAppSelector(selectOrderPagination)
    const loading = useAppSelector(selectOrderListLoading)

    React.useEffect(() => {
        dispatch(orderActions.getList(filter))
    }, [dispatch, filter])

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize
        }
        dispatch(orderActions.setFilter(newFilter))
    }

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
		},
		{
			title: 'Ngày',
			dataIndex: 'booking_at',
			key: 'booking_at',
		},
		{
			title: 'Nhân Viên',
			dataIndex: 'employee_id',
			key: 'employee_id',
		},
		{
			title: 'Khách Hàng',
			dataIndex: 'customer_id',
			key: 'customer_id',
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
    )
}
