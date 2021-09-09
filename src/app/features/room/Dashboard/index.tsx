import { initFilterParams } from 'app/constants';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { roomActions, selectRoomList } from '../Redux/roomSlice';
import ROOM_LIST from './components/roomList';

interface Props {}

const RoomDashboard = (props: Props) => {
	const dispatch = useAppDispatch();
	const roomList = useAppSelector(selectRoomList);

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
					<p className="tw-text-2xl tw-font-semibold">Room Dashboard</p>
				</Col>
			</Row>
			<Row>
				{roomList?.length ? (
					<ROOM_LIST roomList={roomList} />
				) : (
					<div className="tw-w-full tw-h-40 tw-flex tw-justify-center tw-items-center">
						<Spinner
							className="mr-2"
							size="sm"
							style={{ animationDelay: '0.15s' }}
							animation="grow"
							variant="primary"
						/>
						<Spinner
							className="mr-2"
							size="sm"
							style={{ animationDelay: '0.3s' }}
							animation="grow"
							variant="primary"
						/>
						<Spinner
							className="mr-2"
							size="sm"
							style={{ animationDelay: '0.45s' }}
							animation="grow"
							variant="primary"
						/>
						<Spinner
							className="mr-2"
							size="sm"
							style={{ animationDelay: '0.6s' }}
							animation="grow"
							variant="primary"
						/>
						<Spinner
							className="mr-2"
							size="sm"
							style={{ animationDelay: '0.75s' }}
							animation="grow"
							variant="primary"
						/>
					</div>
				)}
			</Row>
		</div>
	);
};

export default RoomDashboard;
