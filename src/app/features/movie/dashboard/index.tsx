import { Button, Card, Col, Modal, Row } from 'antd';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddEditMovie from './components/AddEditMovie';
import ListMovie from './components/ListMovie';

interface Props {}

const MovieDashboardPage = (props: Props) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Button
						icon={<AiOutlinePlus />}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
						onClick={handleAddButtonClick}
					>
						Thêm phim mới
					</Button>
				</Col>
				<Col span={24}>
					<Card>
						<ListMovie />
					</Card>
				</Col>
			</Row>
			<Modal visible={isOpenModal} title="Thông tin phim" footer={null}>
				<AddEditMovie onCancel={() => setIsOpenModal(false)} />
			</Modal>
		</>
	);
};

export default MovieDashboardPage;
