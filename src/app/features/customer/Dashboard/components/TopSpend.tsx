import React from 'react';
import { Card, Table } from 'react-bootstrap';

interface Props {}

const TopSpend = (props: Props) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>TOP chi tiêu</Card.Title>
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th className="text-center">Tài khoản</th>
							<th className="text-right">Chi tiêu</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td align="center">Mark</td>
							<td align="right">100.000.000 đ</td>
						</tr>
						<tr>
							<td>2</td>
							<td align="center">Jacob</td>
							<td align="right">98.000.000 đ</td>
						</tr>
						<tr>
							<td>3</td>
							<td align="center">Lesin</td>
							<td align="right">76.000.000 đ</td>
						</tr>
						<tr>
							<td>4</td>
							<td align="center">Flix</td>
							<td align="right">54.000.000 đ</td>
						</tr>
						<tr>
							<td>5</td>
							<td align="center">Jenny</td>
							<td align="right">31.000.000 đ</td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};

export default TopSpend;
