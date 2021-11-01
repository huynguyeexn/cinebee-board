import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

const Page403 = () => {
	const history = useHistory();
	return (
		<Result
			status="403"
			title="403"
			subTitle="Bạn không có quyền truy cập vào trang này."
			extra={
				<Button type="primary" onClick={() => history.goBack()}>
					Quay về
				</Button>
			}
		/>
	);
};

export default Page403;
