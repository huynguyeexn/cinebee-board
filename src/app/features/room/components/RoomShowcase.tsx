import React from 'react';
import { makeRows } from 'app/utils/helper';

interface Props {
	rows: number;
	cols: number;
	seats?: number[][];
	onSelectSeat?: (row: number, col: number) => void;
}

const RoomShowcase = ({ rows, cols, seats, onSelectSeat }: Props) => {
	console.log(`seats`, seats);
	if (seats) {
		rows = seats.length;
		cols = seats[0].length;
	}

	const rowsAlpha: Array<string> = makeRows(rows);

	const seatStatus = (status: number) => {
		switch (status) {
			case 1:
				return 'occupied';
			case 2:
				return 'selected';

			default:
				return '';
		}
	};

	return (
		<div className="room">
			<div className="screen"></div>
			<div className="seats" style={{ gridTemplateColumns: `repeat(${cols}, min-content)` }}>
				{rowsAlpha.map((row, rowIdx) => {
					let rowEl = [];
					for (let colIndex = 0; colIndex < cols; colIndex++) {
						rowEl.push(
							<div
								key={`seat-${row}-${colIndex + 1}`}
								className={`seat ${seatStatus(seats ? seats[rowIdx][colIndex] : 0)}`}
								onClick={() => (onSelectSeat ? onSelectSeat(rowIdx, colIndex) : {})}
							>
								{row}
								{colIndex + 1}
							</div>
						);
					}
					return rowEl;
				})}
			</div>
		</div>
	);
};

export default RoomShowcase;
