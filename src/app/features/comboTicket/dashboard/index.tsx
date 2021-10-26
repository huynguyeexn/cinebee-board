import React from 'react'
import { Button, Col, Row } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ListComboTicket from './components/ListComboTicket';
import FilterComboTicket from './components/FilterComboTicket';

interface Props {};

export const ComboTicketDashboardPage = (props: Props) => {
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
