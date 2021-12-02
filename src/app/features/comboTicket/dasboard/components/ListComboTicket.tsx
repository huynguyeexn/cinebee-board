import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase'
import React from 'react'
import { comboTicketActions, 
	selectComboTicketFilter, 
	selectComboTicketList, 
	selectComboTicketListLoading, 
	selectComboTicketPagination } from '../../redux/comboTicketSlice'

interface Props {
    
}

export const ListComboTicket = (props: Props) => {
    const dispatch = useAppDispatch()
    const comboTicket = useAppSelector(selectComboTicketList)
    const filter = useAppSelector(selectComboTicketFilter)
    const pagination = useAppSelector(selectComboTicketPagination)
    const loading = useAppSelector(selectComboTicketListLoading)

    React.useEffect(()=>{
        dispatch(comboTicketActions.getList(filter))
    },[dispatch, filter])

    const handlePageChange = (page: number, pageSize?:number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize
        }
        dispatch(comboTicketActions.setFilter(newFilter))
    }

    

    const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Ngày',
			dataIndex: 'get_at',
			key: 'get_at',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Số Lượng',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Đơn Hàng',
			dataIndex: 'order_id',
			key: 'order_id',
		},
		{
			title: 'Combo',
			dataIndex: 'combo_id',
			key: 'combo_id',
		},
	];

    return (
        <>
        <TableBase
            columns={columns}
            dataSource={comboTicket}
            loading={loading}
            onPageChange={handlePageChange}
            pagination={pagination}
        />
    </>
    )
}
