import { Button, Col, Modal, Row } from 'antd';
import { Combo } from 'app/interfaces/combo';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AddEditCombo from './components/AddEditCombo';
import FilterCombo from './components/FilterCombo';
import ListCombo from './components/ListCombo';

interface Props {};

const ComboDashboardPage = (props: Props) => {

    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [data, setData] = React.useState<Combo>();

    const handleAddButtonClick = () => {
        setIsOpenModal(true);
    };

    const handleCancel = () => {
        setData(undefined);
        setIsOpenModal(false);
        setIsEdit(false);
    };

    const handleEdit = (combo: Combo) => {
        setData(combo);
        setIsOpenModal(true);
        setIsEdit(true);
    };

    return ( 
<Row gutter={[16, 16]}>
			<Col span={24}>
			<Link to="combo/new">
				<Button
				
					icon={<AiOutlinePlus />}
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
					onClick={handleAddButtonClick}
				>
					Thêm Combo
				</Button>
				</Link>
			</Col>
			<Col span={24}>
				<FilterCombo />
			</Col>
			<Col span={24}>
				<ListCombo onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditCombo onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
	);
};

export default ComboDashboardPage;

