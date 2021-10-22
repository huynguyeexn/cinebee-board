import { blue } from '@ant-design/colors';
import { Button, Dropdown, Image, Popconfirm, Space } from 'antd';
import { IMAGE_PLACEHOLDER } from 'app/constants';
import { Actor } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	actorActions,
	selectActorFilter,
	selectActorList,
	selectActorListLoading,
	selectActorPagination,
} from '../../redux/actorSlice';

interface Props {
	onEdit: (actor: Actor) => void;
}

const ListActor = ({ onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const actors = useAppSelector(selectActorList);
	const loading = useAppSelector(selectActorListLoading);
	const pagination = useAppSelector(selectActorPagination);
	const filter = useAppSelector(selectActorFilter);

	React.useEffect(() => {
		dispatch(actorActions.getList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(actorActions.setFilter(newFilter));
	};

	const handleDelete = (customer: Actor) => {
		dispatch(actorActions.deleteById(customer));
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
			render: (avatar: string, record: Actor) => (
				<>
					<Image
						fallback={IMAGE_PLACEHOLDER}
						height={100}
						src={avatar || IMAGE_PLACEHOLDER}
						alt={record.fullname}
					/>
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
			render: (record: Actor) => (
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
				dataSource={actors}
				loading={loading}
				onPageChange={handlePageChange}
				pagination={pagination}
			/>
		</>
	);
};

export default ListActor;
