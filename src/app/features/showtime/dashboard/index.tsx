import { PageHeader } from 'antd';
import React from 'react';
import ShowtimeScheduler from '../components/showtimeScheduler';
interface Props {}

const ShowtimeDashboardPage = (props: Props) => {
	return (
		<PageHeader ghost={false}>
			<ShowtimeScheduler />
		</PageHeader>
	);
};

export default ShowtimeDashboardPage;
