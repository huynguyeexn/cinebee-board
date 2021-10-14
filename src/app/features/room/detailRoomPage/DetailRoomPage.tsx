import { PageHeader, Spin, Tag } from 'antd';
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
	const [hasSelected, setHasSelected] = React.useState(0);
	const [emptySeats, setEmptySeats] = React.useState(0);

	React.useEffect(() => {
		if (!id) history.push('/404');

		setLoading(true);
		(async () => {
			let response: Room = await roomApi.getById(id);
			response.seats = JSON.parse(response.seats as string) as number[][];
			setRoom(response);
			setLoading(false);

			setEmptySeats(response.seats.flat().filter((seat) => seat === 0).length);
			setHasSelected(response.seats.flat().filter((seat) => seat === 2).length);
		})();
	}, [dispatch, history, id]);

	const handleSelectSeat = (row: number, col: number) => {
		if (!room) return;
		let newRoom = JSON.parse(JSON.stringify(room));
		if (room.seats[row][col] === 0) {
			newRoom.seats[row][col] = 2;
			setRoom(newRoom);
		}
		if (room.seats[row][col] === 2) {
			newRoom.seats[row][col] = 0;
			setRoom(newRoom);
		}
		setHasSelected((newRoom.seats as number[][]).flat().filter((seat) => seat === 2).length);
	};

	return (
		<Spin spinning={loading}>
			{room && (
				<PageHeader
					ghost={false}
					onBack={() => window.history.back()}
					title={room.name}
					extra={[
						<Tag color="success">Đã chọn ({hasSelected})</Tag>,
						<Tag color="error">Đã đặt ()</Tag>,
						<Tag color="processing">Trống ({emptySeats - hasSelected})</Tag>,
					]}
				>
					<RoomShowcase
						rows={room.rows}
						cols={room.cols}
						seats={room.seats as number[][]}
						onSelectSeat={handleSelectSeat}
					/>
				</PageHeader>
			)}
		</Spin>
	);
};

export default DetailRoomPage;
