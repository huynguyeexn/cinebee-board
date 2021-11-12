import { blue } from '@ant-design/colors';
import { Button, Col, Dropdown, Image, Popconfirm, Row, Space, Spin, Tag } from 'antd';
import { IMAGE_PLACEHOLDER, MOVIE_STATUS } from 'app/constants';
import { ageRatingActions, selectAgeRatingMap } from 'app/features/ageRating/redux/ageRatingSlice';
import { ImageUpload, Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import { ageRatingColor, movieStatusTagColor } from 'app/utils/helper';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
	movieActions,
	selectMovieFilter,
	selectMovieList,
	selectMovieListLoading,
	selectMoviePagination,
} from '../../redux/movieSlice';
import FilterMovie from './FilterMovie';

const ListMovie = () => {
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
			dataIndex: 'posters_full',
			key: 'posters_full',
			render: (posters: ImageUpload[]) => (
				<>
					{posters && posters[0] && (
						<Image
							height={100}
							src={posters[0]?.url}
							alt={posters[0].alt}
							fallback={IMAGE_PLACEHOLDER}
						/>
					)}
				</>
			),
		},
		{
			title: 'Ảnh backdrop',
			dataIndex: 'backdrops_full',
			key: 'backdrops_full',
			render: (backdrops: ImageUpload[]) => (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{backdrops && (
						<>
							<Image.PreviewGroup>
								{backdrops[0] && (
									<Image
										fallback={IMAGE_PLACEHOLDER}
										height={100}
										src={backdrops[0]?.url}
										alt={backdrops[0].alt}
									/>
								)}
								<div className="" style={{ display: 'none' }}>
									{backdrops.length > 0 &&
										backdrops.slice(1).map((image) => {
											return (
												<Image
													fallback={IMAGE_PLACEHOLDER}
													height={100}
													src={image?.url}
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
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: number) => (
				<Tag color={movieStatusTagColor(status)}>{MOVIE_STATUS[status]}</Tag>
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
			render: (text: string) => <span>{moment(new Date(text)).fromNow()}</span>,
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
							<Link to={`movies/${record.id}/edit`}>
								<Button type="text" style={{ color: blue[3] }}>
									Sửa <AiOutlineEdit />
								</Button>
							</Link>
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
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<FilterMovie />
			</Col>
			<Col span={24}>
				<TableBase
					columns={columns}
					dataSource={movies}
					loading={loading}
					onPageChange={handlePageChange}
					pagination={pagination}
				/>
			</Col>
		</Row>
	);
};

export default ListMovie;
