import { PageHeader } from 'antd';
import React from 'react';
import ShowtimeSchedulerNew from '../componetns/showtimeSchedulerNew';
interface Props {}

const ShowtimeDashboardPage = (props: Props) => {
	return (
		<PageHeader ghost={false}>
			<ShowtimeSchedulerNew />
		</PageHeader>
	);
};

export default ShowtimeDashboardPage;
