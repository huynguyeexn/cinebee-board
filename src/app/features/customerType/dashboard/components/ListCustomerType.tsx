import { blue } from '@ant-design/colors';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { CustomerType } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase';
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { customerTypeActions, selectCustomerTypeFilter, selectCustomerTypeList, selectCustomerTypeListLoading, selectCustomerTypePagination } from '../../redux/customerTypeSlice';

interface Props {
    onEdit: (customerType: CustomerType) => void;
}

export const ListCustomerType = ({onEdit}: Props) => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectCustomerTypeFilter);
    const pagination = useAppSelector(selectCustomerTypePagination);
    const customerType = useAppSelector(selectCustomerTypeList);
    const loading = useAppSelector(selectCustomerTypeListLoading);

    React.useEffect(()=>{
        dispatch(customerTypeActions.getList(filter))
    },[dispatch, filter]);

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize,
        };
        dispatch(customerTypeActions.setFilter(newFilter));
    }

    const handleDelete = (customerType: CustomerType) => {
        dispatch(customerTypeActions.deleteById(customerType))
    }

    const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Hạng',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: CustomerType) => (
				<Dropdown
					overlay={
						<Space size="middle">
							<Button
								type="text"
								style={{ color: blue[3] }}
								onClick={() => onEdit(record)}
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
            <TableBase
                columns={columns}
                dataSource={customerType}
                loading={loading}
                onPageChange={handlePageChange}
                pagination={pagination}
            />
        </>
    )
}
