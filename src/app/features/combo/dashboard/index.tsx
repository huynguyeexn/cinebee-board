import { Button, Col, Row } from 'antd';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FilterCombo from './components/FilterCombo';
import ListCombo from './components/ListCombo';

interface Props {};

const ComboDashboardPage = (props: Props) => {
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
				>
					Thêm Combo
				</Button>
				</Link>
			</Col>
			<Col span={24}>
				<FilterCombo />
			</Col>
			<Col span={24}>
				<ListCombo />
			</Col>
			{/* Add edit */}
		</Row>
	);
};

export default ComboDashboardPage;

