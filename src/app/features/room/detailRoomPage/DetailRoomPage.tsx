import { PageHeader, Spin } from 'antd';
import roomApi from 'app/api/roomsApi';
import { Room } from 'app/interfaces';
import { useAppDispatch } from 'app/redux/hooks';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import RoomShowcase from '../components/RoomShowcase';

interface Props {}

const DetailRoomPage = (props: Props) => {
	const dispatch = useAppDispatch();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = React.useState(false);
	const [room, setRoom] = React.useState<Room>();

	React.useEffect(() => {
		if (!id) history.push('/404');

		setLoading(true);
		(async () => {
			const response: Room = await roomApi.getById(id);
			setRoom(response);
			setLoading(false);
		})();
	}, [dispatch, id, history]);

	return (
		<Spin spinning={loading}>
			{room && (
				<PageHeader
					ghost={false}
					onBack={() => window.history.back()}
					title={room.name}
					extra={
						[
							// <Tag color="success">Đã chọn ({hasSelected})</Tag>,
							// <Tag color="error">Đã đặt ()</Tag>,
							// <Tag color="processing">Trống ({emptySeats - hasSelected})</Tag>,
						]
					}
				>
					<RoomShowcase rows={room.rows} cols={room.cols} room={room} />
				</PageHeader>
			)}
		</Spin>
	);
};

export default DetailRoomPage;
