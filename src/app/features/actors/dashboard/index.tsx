import { Button, Col, Modal, Row } from 'antd';
import { Actor } from 'app/interfaces';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddEditActor from './components/AddEditActor';
import FilterActor from './components/FIlterActor';
import ListActor from './components/ListActor';

interface Props {}

const ActorDashboardPage = (props: Props) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [data, setData] = React.useState<Actor>();

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	const handleCancel = () => {
		setData(undefined);
		setIsOpenModal(false);
		setIsEdit(false);
	};

	const handleEdit = (actor: Actor) => {
		setData(actor);
		setIsOpenModal(true);
		setIsEdit(true);
	};

	return (
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
					Thêm diễn viên
				</Button>
			</Col>
			<Col span={24}>
				<FilterActor />
			</Col>
			<Col span={24}>
				<ListActor onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditActor onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
	);
};

export default ActorDashboardPage;
