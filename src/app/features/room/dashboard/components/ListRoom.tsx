import { Badge, Button, Card, Col, Row, Space, Spin, Tag } from 'antd';
import { Room } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { AppPagination } from 'app/utils/components/Pagination';
import { minutesToHoursMinutes } from 'app/utils/helper';
import React from 'react';
import { Link } from 'react-router-dom';
import {
	roomActions,
	selectRoomFilter,
	selectRoomList,
	selectRoomListLoading,
	selectRoomPagination,
} from '../../redux/roomSlice';
interface Props {}

const counter = (): number => {
	const now = new Date().getMinutes();
	return now;
};

const ListRoom = (props: Props) => {
	const [time, setTime] = React.useState<number>(counter());

	const dispatch = useAppDispatch();
	const rooms = useAppSelector(selectRoomList);
	const loading = useAppSelector(selectRoomListLoading);
	const pagination = useAppSelector(selectRoomPagination);
	const filter = useAppSelector(selectRoomFilter);

	React.useEffect(() => {
		dispatch(roomActions.getList(filter));
	}, [dispatch, filter]);

	React.useEffect(() => {
		setTimeout(() => {
			setTime(counter());
		}, 60000);
	});

	return (
		<Spin spinning={loading}>
			<Row gutter={[16, 16]}>
				{rooms &&
					rooms.map((room: Room, idx) => (
						<Col span={6} key={`room-card-` + idx}>
							<Card
								className="room-card"
								title={room.name}
								bordered={false}
								extra={[
									<Link to={`rooms/${room.id}/edit`}>
										<Button type="link">Sửa</Button>
									</Link>,
									<Link to={`rooms/` + room.id}>
										<Button type="default">Xem</Button>
									</Link>,
								]}
							>
								<div style={{ textAlign: 'center' }}>
									<Space size={[8, 8]} style={{ marginBottom: '8px' }}>
										<Tag color="processing">(15) Đã đặt</Tag>
										<Tag color="success">(13) Đã nhận</Tag>
										<Tag color="default">(11) Trống</Tag>
									</Space>
								</div>
								<Badge status="success" text={`Fast 9 - ${minutesToHoursMinutes(time)}`} />
								{/* <Collapse ghost expandIconPosition="right">
									<Panel header="14:15-16:00: Giải Cứu Guy" key="1">
										<p>16:30-19:00: Venom: Đối Mặt Tử Thù</p>
										<p>19:15-20:40: Biệt Đội G.I. Joe: Xà Nhãn Báo Thù</p>
										<p>20:55-21:30: Siêu Sát Thủ Và Rồng</p>
									</Panel>
								</Collapse> */}
							</Card>
						</Col>
					))}

				{pagination && (
					<Col span={24}>
						<AppPagination
							page={+pagination.page}
							total={+pagination.total}
							onPageChange={(page) => {}}
						/>
					</Col>
				)}
			</Row>
		</Spin>
	);
};

export default ListRoom;
