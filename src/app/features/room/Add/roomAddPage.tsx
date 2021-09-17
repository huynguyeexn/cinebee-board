import { makeRows } from 'app/utils/helper';
import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';

interface Props {}

const RoomAddPage = (props: Props) => {
	const [rows, setRows] = useState(5);
	const [cols, setCols] = useState(5);
	const [seatGrid, setSeatGrid] = useState<Array<Array<any>>>(() =>
		Array(rows)
			.fill(null)
			.map(() => Array(cols).fill(Number(1)))
	);

	useEffect(() => {
		console.log(seatGrid);
	}, [seatGrid]);

	useEffect(() => {
		const seatRowsLength = seatGrid.length;
		let newState = seatGrid;
		let seatColsLength = 0;
		if (seatRowsLength > 0) {
			seatColsLength = seatGrid[0].length;
		}

		if (rows > seatRowsLength) {
			newState.push(
				...Array(rows - seatRowsLength)
					.fill(null)
					.map(() => Array(cols).fill(1))
			);
		} else if (rows < seatRowsLength) {
			if (rows >= 0) {
				let newState = seatGrid;
				newState.length = rows;
			}
		}

		if (cols > seatColsLength) {
			newState.map((row) => {
				row.push(...Array(cols - seatColsLength).fill(0));
				return row;
			});
		} else if (cols < seatColsLength) {
			newState.map((row) => {
				row.length = cols;
				return row;
			});
		}
		setSeatGrid(() => [...newState]);
		// eslint-disable-next-line
	}, [rows, cols]);

	const handleChange = (rowNum = 0, colNum = 0) => {
		console.log(seatGrid[0][0]);
		console.log('handleChange', rowNum, colNum);
		let newState = seatGrid;
		newState[rowNum][colNum] = 5;
		setSeatGrid((oldState) => [...newState]);
	};

	return (
		<div className="tw-w-full">
			<div className="mb-4">
				<Form>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Số hàng</Form.Label>
							<Form.Control
								type="number"
								value={rows}
								min={1}
								onChange={(e) => setRows(Number(e.target.value))}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Số cột</Form.Label>
							<Form.Control
								type="number"
								value={cols}
								min={1}
								onChange={(e) => setCols(Number(e.target.value))}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<span>Chú thích:</span>
							<ul className="tw-list-disc tw-ml-10">
								<li>
									<span>Màu xám: ghế trống</span>
								</li>
								<li>
									<span>Màu xanh lá: ghế đã có khách</span>
								</li>
								<li>
									<span>Màu xanh lam: ghế đã đặt</span>
								</li>
								<li>
									<span>Không mày: chưa có ghế</span>
								</li>
							</ul>
						</Form.Group>
					</Form.Row>
				</Form>
			</div>
			<div className="mb-4"></div>
			<div className="tw-border tw-overflow-scroll tw-max-h-screen">
				<table className="table-seats">
					<thead className="thead">
						<tr className="tw-sticky tw-top-0 tw-bg-white">
							{(() => {
								let result = [];
								for (let colNum = 0; colNum < cols + 1; colNum++) {
									if (colNum === 0) {
										result.push(<th key={`${colNum + 1}`}></th>);
										continue;
									}
									result.push(
										<td key={`${colNum + 1}`}>
											<div className="p-2 tw-flex tw-items-center tw-justify-center tw-border-2">
												{colNum}
											</div>
										</td>
									);
								}
								return result;
							})()}
						</tr>
					</thead>
					<tbody>
						{typeof seatGrid !== 'undefined' &&
							rows &&
							makeRows(rows).map((row, rowNum) => (
								<tr key={row + rowNum}>
									{(() => {
										let result = [];
										for (let colNum = 0; colNum < cols + 1; colNum++) {
											if (colNum === 0) {
												result.push(
													<td
														key={`${rowNum}${colNum + 1}`}
														className="tw-sticky tw-left-0 tw-bg-white"
													>
														<div className="p-2 tw-flex tw-items-center tw-justify-center tw-border-2">
															{row}
														</div>
													</td>
												);
												continue;
											}
											result.push(
												<th className="tw-p-1" key={`seat-${rowNum}${colNum}`}>
													<div
														className="tw-h-10 tw-w-10 tw-bg-gray-300 tw-rounded-md hover:tw-bg-blue-400"
														onClick={() => handleChange(rowNum, colNum - 1)}
													>
														<br />[{rowNum}][{colNum - 1}]
													</div>
												</th>
											);
										}
										return result;
									})()}
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RoomAddPage;
