import { Button, Col, Row } from 'antd';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ListMovie from './components/ListMovie';

interface Props {}

const MovieDashboardPage = (props: Props) => {
	return (
		<>
			<Row gutter={[16, 16]}>
				{/* List Actions */}
				<Col span={24}>
					<Link to="movies/new">
						<Button
							icon={<AiOutlinePlus />}
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							Thêm phim mới
						</Button>
					</Link>
				</Col>

				{/* List table */}
				<Col span={24}>
					<ListMovie />
				</Col>
			</Row>
		</>
	);
};

export default MovieDashboardPage;
