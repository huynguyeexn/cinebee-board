import screenImg from 'app/assets/images/screen.png';
import { Room } from 'app/interfaces';
import { makeRows } from 'app/utils/helper';
import React from 'react';

interface Props {
	rows: number;
	cols: number;
	room?: Room;
	onSelectSeat?: (row: number, col: number) => void;
}

const RoomShowcase = ({ rows, cols, room, onSelectSeat }: Props) => {
	const rowsAlpha: Array<string> = makeRows(rows);

	return (
		<div className="room">
			<div className="screen">
				<img src={screenImg} alt="màn hình" />
			</div>
			<div className="seats" style={{ gridTemplateColumns: `repeat(${cols}, min-content)` }}>
				{room
					? room.seats.map((seat, colIdx) => (
							<div key={`seat-${seat.index}`} className={`seat`}>
								{seat.label}
							</div>
					  ))
					: rowsAlpha.map((row, rowIdx) => {
							let rowEl = [];
							for (let colIndex = 0; colIndex < cols; colIndex++) {
								rowEl.push(
									<div
										key={`seat-${row}-${colIndex + 1}`}
										className={`seat`}
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
