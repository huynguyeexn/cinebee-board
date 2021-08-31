import React from 'react';
import { Card, Table } from 'react-bootstrap';

interface Props {}

const ActivityHistory = (props: Props) => {
	return (
		<Card>
			<Card.Body>
				<p>Hoạt động tài khoản</p>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Ngày tháng</th>
							<th>Quốc gia</th>
							<th>IP</th>
							<th>Hoạt động</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2020-04-30 10:28:56 GMT+7</td>
							<td>VN</td>
							<td>42.117.250.86</td>
							<td>Thay đổi mật khẩu</td>
						</tr>
						<tr>
							<td>2019-07-04 12:26:29 GMT+7</td>
							<td>VN</td>
							<td>42.117.250.86</td>
							<td>Thay đổi số điện thoại</td>
						</tr>
						<tr>
							<td>2019-07-04 12:26:29 GMT+7</td>
							<td>VN</td>
							<td>27.75.74.109</td>
							<td>Thay đổi mật khẩu</td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};

export default ActivityHistory;
