import { Button, Col, Modal, Row } from 'antd';
import { Director } from 'app/interfaces';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddEditDirector from './components/AddEditDirector';
import FilterDirector from './components/FIlterDirector';
import ListDirector from './components/ListDirector';

interface Props {}

const DirectorDashboardPage = (props: Props) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [data, setData] = React.useState<Director>();

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	const handleCancel = () => {
		setData(undefined);
		setIsOpenModal(false);
		setIsEdit(false);
	};

	const handleEdit = (director: Director) => {
		setData(director);
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
					Thêm đạo diễn
				</Button>
			</Col>
			<Col span={24}>
				<FilterDirector />
			</Col>
			<Col span={24}>
				<ListDirector onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal centered={true} closable={false} visible={isOpenModal} title={false} footer={null}>
				<AddEditDirector onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
	);
};

export default DirectorDashboardPage;
