import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { useEffect } from 'react';
import React from 'react';
import { roomActions, selectRoomList } from '../Redux/roomSlice';
import { initFilterParams } from 'app/constants';

interface Props {}

const RoomDashboard = (props: Props) => {
	const dispatch = useAppDispatch();
	const roomList = useAppSelector(selectRoomList);
	if (roomList) {
		console.log(roomList);
	}

	useEffect(() => {
		dispatch(
			roomActions.fetchRoomList({
				...initFilterParams,
				sort_by: 'name',
				sort_type: 'asc',
			})
		);
	}, [dispatch]);

	return <div>RoomDashboard</div>;
};

export default RoomDashboard;
