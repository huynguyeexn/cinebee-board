import { ComboTicket } from 'app/interfaces/comboTicket';
import React from 'react'
import { Button, Col, Modal, Row } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ListComboTicket from './components/ListComboTicket';
import FilterComboTicket from './components/FilterComboTicket';

interface Props {};

export const ComboTicketDashboardPage = (props: Props) => {

    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [data, setData] = React.useState<ComboTicket>();

    const handleAddButtonClick = () => {
        setIsOpenModal(true);
    };

    const handleCancel = () => {
        setData(undefined);
        setIsOpenModal(false);
        setIsEdit(false);
    };

    const handleEdit = (comboTicket: ComboTicket) => {
        setData(comboTicket);
        setIsOpenModal(true);
        setIsEdit(true);
    };

    return (
<Row gutter={[16, 16]}>
			<Col span={24}>
			<Link to="comboticket/new">
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
				<FilterComboTicket />
			</Col>
			<Col span={24}>
				<ListComboTicket />
			</Col>
			{/* Add edit */}
		</Row>
	);
};

export default ComboTicketDashboardPage;
