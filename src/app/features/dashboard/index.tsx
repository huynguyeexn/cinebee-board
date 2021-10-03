import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import {
	AiOutlineArrowDown,
	AiOutlineArrowUp,
	AiOutlineEdit,
	AiOutlineEllipsis,
	AiOutlineSetting,
} from 'react-icons/ai';
import DashboardChartLine from './components/chartLine';
import DemoPie from './components/demoPie';
import DemoTable from './components/demoTable';

interface Props {}

const DashboardPage = (props: Props) => {
	return (
		<div>
			<Row gutter={[16, 16]}>
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
							valueStyle={{ color: '#5513cf' }}
							prefix={<AiOutlineArrowDown />}
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
							valueStyle={{ color: '#cfc313' }}
							prefix={<AiOutlineArrowDown />}
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
							valueStyle={{ color: '#c913cf' }}
							prefix={<AiOutlineArrowDown />}
							suffix="%"
						/>
					</Card>
				</Col>
				<Col span={18}>
					<Card title="Default size card" extra={<a href="google.com">More</a>}>
						<DashboardChartLine />
					</Card>
				</Col>
				<Col span={6}>
					<Card
						title="Default size card"
						actions={[
							<AiOutlineSetting key="setting" />,
							<AiOutlineEdit key="edit" />,
							<AiOutlineEllipsis key="ellipsis" />,
						]}
						style={{ height: '100%' }}
					>
						<DemoPie />
					</Card>
					,
				</Col>
				<Col span={16}>
					<Card title="Demo table">
						<DemoTable />
					</Card>
				</Col>
				<Col span={8}>
					<Card title="Demo List"></Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardPage;
