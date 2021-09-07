import { IRoom } from 'app/interfaces/room';
import React from 'react';
import { Button, Card, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCouch } from 'react-icons/fa';
import { useHistory } from 'react-router';

interface Props {
	roomList: IRoom[];
}

const ROOM_LIST = ({ roomList }: Props) => {
	const history = useHistory();

	const onManageClick = (roomId?: string | number) => {
		return history.push(`/admin/rooms/edit/${roomId}`);
	};

	return (
		<>
			{roomList.map((room, idx) => (
				<Col md={3} key={room.id} className="mb-3">
					<Card style={{ width: '18rem' }} className="hover-shadow">
						<Card.Body className="tw-flex-rows">
							<div className="tw-border-b  pb-2">
								<p>
									<small className="text-danger">Đang chiếu 24 phút 12 giây</small>
								</p>
								<h4 className="mb-1 tw-font-semibold">{room.name}</h4>
							</div>
							<div className="py-2 p-1 tw-grid tw-grid-cols-3 tw-place-items-center  tw-border-b">
								<OverlayTrigger
									placement="bottom"
									overlay={
										<Tooltip id={`tooltip-room-item-${room.id}`}>Ghế đã có khách</Tooltip>
									}
								>
									<span className="tw-cursor-default">
										<FaCouch className="mx-auto text-success" />
										<span>12</span>
									</span>
								</OverlayTrigger>
								<OverlayTrigger
									placement="bottom"
									overlay={
										<Tooltip id={`tooltip-room-item-${room.id}`}>Ghế đã đặt</Tooltip>
									}
								>
									<span className="tw-cursor-default">
										<FaCouch className="mx-auto text-info" />
										<span>34</span>
									</span>
								</OverlayTrigger>

								<OverlayTrigger
									placement="bottom"
									overlay={
										<Tooltip id={`tooltip-room-item-${room.id}`}>Ghế còn trống</Tooltip>
									}
								>
									<span className="tw-cursor-default">
										<FaCouch className="mx-auto text-muted" />
										<span>16</span>
									</span>
								</OverlayTrigger>
							</div>

							<div className=" py-2 tw-cursor-default">
								<OverlayTrigger
									placement="bottom"
									overlay={
										<Tooltip id={`tooltip-room-item-${room.id}`}>
											[17:30 - 19:30] - BÀN TAY DIỆT QUỶ
										</Tooltip>
									}
								>
									<p className="tw-line-clamp-1 text-center">
										[17:30 - 19:30] - BÀN TAY DIỆT QUỶ
									</p>
								</OverlayTrigger>
							</div>
							<Button variant="primary btn-block" onClick={() => onManageClick(room.id)}>
								Quản lý
							</Button>
						</Card.Body>
					</Card>
				</Col>
			))}
		</>
	);
};

export default ROOM_LIST;
