import { Button, Col, Modal, Row } from 'antd';
import { Genre } from 'app/interfaces';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import AddEditGenre from './components/AddEditGenre';
import FilterGenre from './components/FIlterGenre';
import ListGenre from './components/ListGenre';

interface Props {}

const GenreDashboardPage = (props: Props) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [data, setData] = React.useState<Genre>();

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	const handleCancel = () => {
		setData(undefined);
		setIsOpenModal(false);
		setIsEdit(false);
	};

	const handleEdit = (actor: Genre) => {
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
					Thêm thể loại
				</Button>
			</Col>
			<Col span={24}>
				<FilterGenre />
			</Col>
			<Col span={24}>
				<ListGenre onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditGenre onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
	);
};

export default GenreDashboardPage;
