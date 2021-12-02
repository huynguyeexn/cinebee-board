import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { Item } from 'app/interfaces/item';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	itemActions,
	selectItemFilter,
	selectItemList,
	selectItemListLoading,
	selectItemPagination,
} from '../../redux/itemSilce';
import { blue } from '@ant-design/colors';

interface Props {
	onEdit: (item: Item) => void;
}

const ListItem = ({ onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectItemList);
	const loading = useAppSelector(selectItemListLoading);
	const pagination = useAppSelector(selectItemPagination);
	const filter = useAppSelector(selectItemFilter);

	React.useEffect(() => {
		dispatch(itemActions.getList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(itemActions.setFilter(newFilter));
	};

	const handleDelete = (customer: Item) => {
		dispatch(itemActions.deleteById(customer));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Tên đồ ăn',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Cập nhật',
			dataIndex: 'updated_at',
			key: 'updated_at',
			render: (text: string) => <span>{moment(new Date(text)).fromNow()}</span>,
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: Item) => (
				<Dropdown
					overlay={
						<Space size="middle">
							<Button type="text" style={{ color: blue[3] }} onClick={() => onEdit(record)}>
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
		<TableBase
			columns={columns}
			dataSource={items}
			loading={loading}
			pagination={pagination}
			onPageChange={handlePageChange}
		/>
	);
};

export default ListItem;
