import { initFilterParams } from 'app/constants';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { LOADING } from 'app/utils/components/Loading';
import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BiPlusCircle } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { roomActions, selectRoomList, selectRoomLoading } from '../Redux/roomSlice';
import ROOM_LIST from './components/roomList';

interface Props {}

const RoomDashboard = (props: Props) => {
	const dispatch = useAppDispatch();
	const roomList = useAppSelector(selectRoomList);
	const roomLoading = useAppSelector(selectRoomLoading);

	console.log(roomList);

	useEffect(() => {
		dispatch(
			roomActions.fetchRoomList({
				...initFilterParams,
				per_page: 100,
				sort_by: 'name',
				sort_type: 'asc',
			})
		);
	}, [dispatch]);

	return (
		<div>
			<Row className="mb-4">
				<Col>
					<p className="tw-text-2xl tw-font-semibold">Quản lý phòng chiếu</p>
				</Col>
				<Col>
					<Button
						as={NavLink}
						to="/admin/rooms/create"
						variant="outline-primary float-right d-flex align-items-center"
					>
						Thêm phòng chiếu <BiPlusCircle className="ml-1" />
					</Button>
				</Col>
			</Row>
			<Row>
				{roomLoading ? <LOADING /> : roomList && <ROOM_LIST roomList={roomList} />}
			</Row>
		</div>
	);
};

export default RoomDashboard;
