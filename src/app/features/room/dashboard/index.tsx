import { Button, Col, Row } from 'antd';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ListRoom from './components/ListRoom';

const RoomDashboardPage = () => {
	return (
		<Row gutter={[16, 16]}>
			{/* List Actions */}
			<Col span={24}>
				<Link to="rooms/new">
					<Button
						icon={<AiOutlinePlus />}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						Thêm phòng chiếu
					</Button>
				</Link>
			</Col>

			{/* List table */}
			<Col span={24}>
				<ListRoom />
			</Col>
		</Row>
	);
};

export default RoomDashboardPage;
