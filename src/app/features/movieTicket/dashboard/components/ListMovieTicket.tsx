import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase'
import React from 'react'
import { movieTicketActions, selectMovieTicketFilter, selectMovieTicketList, selectMovieTicketListLoading, selectMovieTicketPagination } from '../../redux/movieTicketSlice'

interface Props {
    
}

export const ListMovieTicket = (props: Props) => {
    const dispatch = useAppDispatch()
    const movieTicket = useAppSelector(selectMovieTicketList)
    const filter = useAppSelector(selectMovieTicketFilter)
    const pagination = useAppSelector(selectMovieTicketPagination)
    const loading = useAppSelector(selectMovieTicketListLoading)

    React.useEffect(() => { 
        dispatch(movieTicketActions.getList(filter))
    },[dispatch, filter]);

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize,
        };

        dispatch(movieTicketActions.setFilter(newFilter));
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
			dataIndex: 'get_at',
			key: 'get_at',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Đơn Hàng',
			dataIndex: 'order_id',
			key: 'order_id',
		},
		{
			title: 'Xuất Chiếu',
			dataIndex: 'showtime_id',
			key: 'showtime_id',
		},
		{
			title: 'Phòng',
			dataIndex: 'room_id',
			key: 'room_id',
		},
		{
			title: 'Ghế',
			dataIndex: 'seat_id',
			key: 'seat_id',
		},
	];
    return (
        <>
            <TableBase
                columns={columns}
                dataSource={movieTicket}
                loading={loading}
                onPageChange={handlePageChange}
                pagination={pagination}
            />
        </>
    )
}
