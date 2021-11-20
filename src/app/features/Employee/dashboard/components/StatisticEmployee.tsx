import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

interface Props {}

const StatisticEmployee = (props: Props) => {
	return (
		<Row gutter={16}>
			<Col span={6}>
				<Card>
					<Statistic
						title="Active"
						value={11.28}
						precision={2}
						valueStyle={{ color: '#3f8600' }}
						prefix={<AiOutlineArrowUp />}
						suffix="%"
					/>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic
						title="Idle"
						value={9.3}
						precision={2}
						valueStyle={{ color: '#cf1322' }}
						prefix={<AiOutlineArrowDown />}
						suffix="%"
					/>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic
						title="Active"
						value={11.28}
						precision={2}
						valueStyle={{ color: '#005086' }}
						prefix={<AiOutlineArrowUp />}
						suffix="%"
					/>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<Statistic
						title="Idle"
						value={9.3}
						precision={2}
						valueStyle={{ color: '#cccf13' }}
						prefix={<AiOutlineArrowDown />}
						suffix="%"
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default StatisticEmployee;
