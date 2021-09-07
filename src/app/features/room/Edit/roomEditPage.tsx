import { useState } from 'react';
import React from 'react';
import { Col, Form } from 'react-bootstrap';

interface Props {}

const makeRows = (length: number) => {
	const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const alphaLength = alpha.length;
	let count = 0;
	let result = [];
	console.log(alphaLength);
	do {
		if (count > 0) {
			for (let i = 0; i < count; i++) {
				for (let j = 0; j < (alphaLength > length ? length : alphaLength); j++) {
					result.push(`${alpha[i]}${alpha[j]}`);
				}
			}
		} else {
			for (let i = 0; i < (alphaLength > length ? length : alphaLength); i++) {
				result.push(alpha[i]);
			}
		}
		count++;
		length -= alphaLength;
		console.log(length);
	} while (length > 0);
	console.log(length);

	return result;
};

const RoomEditPage = (props: Props) => {
	const [rows, setRows] = useState(5);
	const [cols, setCols] = useState(5);

	console.log(makeRows(26 * 3 + 1));
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
								onChange={(e) => setRows(Number(e.target.value))}
							/>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Số cột</Form.Label>
							<Form.Control
								type="number"
								value={cols}
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
			<p className="text-center tw-border-t-8 tw-rounded-t-full mb-3">màn hình</p>
			<div
				className={`tw-grid tw-grid-rows-10 tw-place-items-stretch tw-gap-y-5 tw-gap-x-1`}
				style={{
					gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
				}}
			>
				{makeRows(rows).map((row) => {
					let result = [];
					for (let index = 0; index < cols; index++) {
						result.push(
							<div
								key={`${row}${index + 1}`}
								className="tw-bg-gray-200 p-3 tw-flex tw-justify-center tw-items-center tw-rounded-t-2xl hover:tw-bg-blue-200 tw-cursor-pointer"
							>
								{row}
								{index + 1}
							</div>
						);
					}
					return result;
				})}
			</div>
		</div>
	);
};

export default RoomEditPage;
