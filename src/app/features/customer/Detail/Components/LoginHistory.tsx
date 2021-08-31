import React from 'react';
import { Card, Table } from 'react-bootstrap';

interface Props {
	className: string;
}

const LoginHistory = ({ className }: Props) => {
	return (
		<Card className={className}>
			<Card.Body>
				<p>Lịch sử đăng nhập</p>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Ngày tháng</th>
							<th>Quốc gia</th>
							<th>IP</th>
							<th>Nguồn</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2021-08-31 16:36:46 GMT+7</td>
							<td>VN</td>
							<td>171.236.49.31</td>
							<td>Cinebee WEBAPP</td>
						</tr>
						<tr>
							<td>2021-08-31 16:25:36 GMT+7</td>
							<td>VN</td>
							<td>171.236.49.31</td>
							<td>Cinebee WEBAPP</td>
						</tr>
						<tr>
							<td>2021-08-31 16:24:55 GMT+7</td>
							<td>VN</td>
							<td>171.236.49.31</td>
							<td>Cinebee WEBAPP</td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};

export default LoginHistory;
