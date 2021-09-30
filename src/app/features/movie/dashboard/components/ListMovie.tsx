import { blue } from '@ant-design/colors';
import { Button, Dropdown, Popconfirm, Space, Spin, Tag, Image } from 'antd';
import { URL_SERVER } from 'app/constants';
import {
	ageRatingActions,
	selectAgeRatingMap,
} from 'app/features/ageRating/redux/ageRatingSlice';
import { ImageUpload, Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import { ageRatingColor } from 'app/utils/helper';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
	movieActions,
	selectMovieFilter,
	selectMovieList,
	selectMovieListLoading,
	selectMoviePagination,
} from '../../redux/movieSlice';

interface Props {}

const ListMovie = (props: Props) => {
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovieList);
	const loading = useAppSelector(selectMovieListLoading);
	const pagination = useAppSelector(selectMoviePagination);
	const filter = useAppSelector(selectMovieFilter);

	const ageRatingMap = useAppSelector(selectAgeRatingMap);

	React.useEffect(() => {
		dispatch(movieActions.getList(filter));
	}, [dispatch, filter]);

	React.useEffect(() => {
		dispatch(ageRatingActions.getList());
	}, [dispatch]);

	const handlePageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};

		dispatch(movieActions.setFilter(newFilter));
	};

	const handleDelete = (customer: Movie) => {
		dispatch(movieActions.deleteById(customer));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Tên phim',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Ảnh poster',
			dataIndex: 'posters',
			key: 'posters',
			render: (posters: ImageUpload[]) => (
				<>
					{posters && posters[0] && (
						<Image
							height={100}
							src={`${URL_SERVER}/${posters[0].folder}${posters[0].file_name}`}
							alt={posters[0].alt}
						/>
					)}
				</>
			),
		},
		{
			title: 'Ảnh backdrop',
			dataIndex: 'backdrops',
			key: 'backdrops',
			render: (backdrops: ImageUpload[]) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{backdrops && (
						<>
							<Image.PreviewGroup>
								{backdrops[0] && (
									<Image
										height={100}
										src={`${URL_SERVER}/${backdrops[0].folder}${backdrops[0].file_name}`}
										alt={backdrops[0].alt}
									/>
								)}
								<div className="" style={{ display: 'none' }}>
									{backdrops.length > 0 &&
										backdrops.slice(1).map((image, idx) => {
											return (
												<Image
													height={100}
													src={`${URL_SERVER}/${image.folder}${image.file_name}`}
													alt={image.alt}
												/>
											);
										})}
								</div>
							</Image.PreviewGroup>
							{backdrops.length > 0 && (
								<Tag style={{ marginLeft: '8px' }}>+{backdrops.length - 1}</Tag>
							)}
						</>
					)}
				</div>
			),
		},
		{
			title: 'Giới hạn độ tuổi',
			dataIndex: 'age_rating_id',
			key: 'age_rating_id',
			render: (id: number) => (
				<>
					<span>
						{Object.keys(ageRatingMap).length !== 0 ? (
							<Tag color={ageRatingColor(ageRatingMap[`${id}`]?.name)}>
								{ageRatingMap[`${id}`]?.name}
							</Tag>
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
		},
		{
			title: 'Ngày chiếu',
			dataIndex: 'release_date',
			key: 'release_date',
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
			render: (record: Movie) => (
				<Dropdown
					overlay={
						<Space size="middle">
							<Button
								type="text"
								style={{ color: blue[3] }}
								// onClick={() => handleEdit(record)}
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
		<TableBase
			columns={columns}
			dataSource={movies}
			loading={loading}
			onPageChange={handlePageChange}
			pagination={pagination}
		/>
	);
};

export default ListMovie;
