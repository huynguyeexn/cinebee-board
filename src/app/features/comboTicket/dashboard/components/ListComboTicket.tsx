import { blue } from '@ant-design/colors';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { ComboTicket } from 'app/interfaces/comboTicket'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	comboTicketActions,
	selectComboTicketFilter,
	selectComboTicketList,
	selectComboTicketListLoading,
	selectComboTicketPagination,
} from '../../redux/comboTicketSlice';
/* interface Props {
    onEdit: (comboTicket: ComboTicket) => void;
} */

const ListComboTicket = () => {
    const dispatch = useAppDispatch();
    const comboTickets = useAppSelector(selectComboTicketList);
    const loading = useAppSelector(selectComboTicketListLoading);
    const pagination = useAppSelector(selectComboTicketPagination);
    const filter = useAppSelector(selectComboTicketFilter);

    React.useEffect(() => {
        dispatch(comboTicketActions.getList(filter));
    },[dispatch, filter]);

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize,
        };

        dispatch(comboTicketActions.setFilter(newFilter));
    };

    const handleDelete = (customer: ComboTicket) => {
        dispatch(comboTicketActions.deleteById(customer));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 65,
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'get_at',
            key: 'get_at',
            render: (text: string) => <span>{moment(text).fromNow()}</span>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Cập nhật',
            dataIndex: 'update_at',
            key: 'updated_at',
            render: (text: string) => <span>{moment(text).fromNow()}</span>
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 65,
            render: (record: ComboTicket) => (
                <Dropdown
                    overlay = {
                        <Space size="middle">

                            <Button type="text" style={{ color:blue[3] }} >
                                Sửa <AiOutlineEdit/>
                            </Button>

                            <Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
                                <Button type="text" danger>
                                    Xóa <AiOutlineDelete/>
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
            )
        }
    ]

    return (
            <TableBase
                columns={columns}
                dataSource={comboTickets}
                loading={loading}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
    )
}

export default ListComboTicket;