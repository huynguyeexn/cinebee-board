import { blue } from '@ant-design/colors';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import { Genre, Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	genreActions,
	selectGenreFilter,
	selectGenreList,
	selectGenreListLoading,
	selectGenrePagination,
} from '../../redux/genreSlice';

interface Props {
	onEdit: (genre: Genre) => void;
}

const ListGenre = ({ onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenreList);
	const loading = useAppSelector(selectGenreListLoading);
	const pagination = useAppSelector(selectGenrePagination);
	const filter = useAppSelector(selectGenreFilter);

	React.useEffect(() => {
		dispatch(genreActions.getList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(genreActions.setFilter(newFilter));
	};

	const handleDelete = (customer: Genre) => {
		dispatch(genreActions.deleteById(customer));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Thể loại',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Đường dẫn',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Phim',
			dataIndex: 'movies',
			key: 'movies',
			render: (movies: Movie[]) => <span>{movies.length || 0}</span>,
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
			render: (record: Genre) => (
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
				dataSource={genres}
				loading={loading}
				onPageChange={handlePageChange}
				pagination={pagination}
			/>
		</>
	);
};

export default ListGenre;
