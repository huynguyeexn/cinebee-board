import { blue } from '@ant-design/colors';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { Combo } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
	comboActions,
	selectComboFilter,
	selectComboList,
	selectComboListLoading,
	selectComboPagination,
} from '../../redux/comboSlice';

/* interface Props {
    onEdit: (combo: Combo) => void;
} */

const ListCombo = () => {
    const dispatch = useAppDispatch()
    const combos = useAppSelector(selectComboList)
    const loading = useAppSelector(selectComboListLoading)
    const pagination = useAppSelector(selectComboPagination)
    const filter = useAppSelector(selectComboFilter)

    React.useEffect(() => {
        dispatch(comboActions.getList(filter));
    },[dispatch, filter]);

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize,
        };

        dispatch(comboActions.setFilter(newFilter));
    };

    const handleDelete = (customer: Combo) => {
        dispatch(comboActions.deleteById(customer));
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 65,
        },
        {
            title: 'Tên Combo',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text: string) => <span>{moment(text).fromNow()}</span>
        },
        {
            title: 'Cập nhật',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text: string) => <span>{moment(text).fromNow()}</span>
        },
        {
            title: '',
            key: 'action',
            fixed: 'right',
            width: 65,
            render: (record: Combo) => (
                <Dropdown
                    overlay = {
                        <Space size="middle">

                            <Link to={`combo/${record.id}/edit`}>
								<Button type="text" style={{ color: blue[3] }}>
									Sửa <AiOutlineEdit />
								</Button>
							</Link>
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
            ),
        },
    ];
    return (

        <TableBase
            columns={columns}
            dataSource={combos}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
        />
    );
};

export default ListCombo;