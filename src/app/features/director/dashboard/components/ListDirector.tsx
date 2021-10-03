import { blue } from '@ant-design/colors';
import { Button, Dropdown, Image, Popconfirm, Space } from 'antd';
import { IMAGE_PLACEHOLDER } from 'app/constants';
import { Director } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	directorActions,
	selectDirectorFilter,
	selectDirectorList,
	selectDirectorListLoading,
	selectDirectorPagination,
} from '../../redux/directorSlice';

interface Props {
	onEdit: (director: Director) => void;
}

const ListDirector = ({ onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const directors = useAppSelector(selectDirectorList);
	const loading = useAppSelector(selectDirectorListLoading);
	const pagination = useAppSelector(selectDirectorPagination);
	const filter = useAppSelector(selectDirectorFilter);

	React.useEffect(() => {
		dispatch(directorActions.getList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(directorActions.setFilter(newFilter));
	};

	const handleDelete = (customer: Director) => {
		dispatch(directorActions.deleteById(customer));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Tên diễn viên',
			dataIndex: 'fullname',
			key: 'fullname',
		},
		{
			title: 'Ảnh',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (avatar: string, record: Director) => (
				<>
					<Image fallback={IMAGE_PLACEHOLDER} height={100} src={avatar} alt={record.fullname} />
				</>
			),
		},
		{
			title: 'Cập nhật',
			key: 'updated_at',
			dataIndex: 'updated_at',
			render: (text: string) => <span>{moment(text).fromNow()}</span>,
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: Director) => (
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
		<>
			<TableBase
				columns={columns}
				dataSource={directors}
				loading={loading}
				onPageChange={handlePageChange}
				pagination={pagination}
			/>
		</>
	);
};

export default ListDirector;
