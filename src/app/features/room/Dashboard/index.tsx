import { initFilterParams } from 'app/constants';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { roomActions, selectRoomList } from '../Redux/roomSlice';
import ROOM_LIST from './components/roomList';

interface Props {}

const RoomDashboard = (props: Props) => {
	const dispatch = useAppDispatch();
	const roomList = useAppSelector(selectRoomList);

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
				<Col>RoomDashboard</Col>
			</Row>
			<Row>{roomList && <ROOM_LIST roomList={roomList} />}</Row>
		</div>
	);
};

export default RoomDashboard;
