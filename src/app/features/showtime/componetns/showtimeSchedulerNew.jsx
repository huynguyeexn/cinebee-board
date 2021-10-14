import { Col, List, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const resourceMap = [
	{ resourceId: 1, resourceTitle: 'Rạp 1' },
	{ resourceId: 2, resourceTitle: 'Rạp 2' },
	{ resourceId: 3, resourceTitle: 'Rạp 3' },
	{ resourceId: 4, resourceTitle: 'Rạp 4' },
	{ resourceId: 5, resourceTitle: 'Rạp 5' },
	{ resourceId: 6, resourceTitle: 'Rạp 6' },
];

const movies = [
	{
		id: 0,
		name: 'Vệ sinh rạp',
		running_time: 15,
	},
	{
		id: 99,
		name: 'Đón khách',
		running_time: 15,
	},
	{
		id: 1,
		name: 'Venom: Đối Mặt Tử Thù',
		slug: 'phim-moi',
		description: 'dayvfgb n no wbt udnv onerijn g',
		release_date: '2021-10-03 13:48:55',
		running_time: 100,
	},
	{
		id: 2,
		name: 'Giải Cứu Guy',
		slug: 'phim-moi',
		description: 'dayvfgb n no wbt udnv onerijn g',
		release_date: '2021-10-03 13:48:55',
		running_time: 120,
	},
	{
		id: 3,
		name: 'Siêu Sát Thủ Và Rồng',
		slug: 'phim-moi',
		description: 'dayvfgb n no wbt udnv onerijn g',
		release_date: '2021-10-03 13:48:55',
		running_time: 130,
	},
];

const minTime = new Date().setHours(8, 0, 0);
const maxTime = new Date().setHours(23, 0, 0);

const ShowtimeSchedulerNew = () => {
	const [events, setEvents] = React.useState([]);
	const [draggedEvent, setDraggedEvent] = React.useState(null);
	const [counters, setCounters] = React.useState({});
	const [displayDragItemInCell] = React.useState(true);

	React.useEffect(() => {
		console.log(`events`, JSON.stringify(events));
	}, [events]);

	const moveEvent = ({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) => {
		const idx = events.indexOf(event);
		let allDay = event.allDay;

		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true;
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false;
		}

		const updatedEvent = { ...event, start, end, resourceId, allDay };

		const nextEvents = [...events];
		nextEvents.splice(idx, 1, updatedEvent);

		setEvents(nextEvents);
	};

	const handleDragStart = (event) => {
		setDraggedEvent(event);
	};

	const dragFromOutsideItem = () => {
		return draggedEvent;
	};

	const customOnDragOver = (event) => {
		if (draggedEvent !== 'undroppable') {
			event.preventDefault();
		}
	};

	const onDropFromOutside = (value) => {
		const movie = draggedEvent;
		const event = {
			...value,
			resourceId: value.resource,
			end: new Date(value.start.getTime() + movie.running_time * 60000),
			id: Date.now(),
			title: movie.name,
		};
		const updatedCounters = {
			...counters,
			[movie.name]: counters[movie.name] + 1,
		};
		setDraggedEvent(null);
		setCounters(updatedCounters);
		newEvent(event);
	};

	const newEvent = (event) => {
		const newEvents = events.concat([event]);
		setEvents(newEvents);
	};

	return (
		<div>
			<Row gutter={[8, 8]}>
				<Col span={18}>
					<DragAndDropCalendar
						selectable
						localizer={localizer}
						events={events}
						onEventDrop={moveEvent}
						resizable={false}
						resources={resourceMap}
						resourceIdAccessor="resourceId"
						resourceTitleAccessor="resourceTitle"
						showMultiDayTimes={true}
						defaultDate={new Date(2021, 9, 11)}
						defaultView={Views.DAY}
						min={minTime}
						max={maxTime}
						timeslots={6}
						step={5}
						views={['day', 'work_week']}
						dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
						onDropFromOutside={onDropFromOutside}
						onDragOver={customOnDragOver}
						onD
					/>
				</Col>
				<Col span={6}>
					<List
						style={{ marginBottom: '16px', position: 'sticky', top: 0 }}
						size="small"
						header={<div>Danh sách phim</div>}
						bordered
						dataSource={movies}
						renderItem={(movie) => (
							<List.Item
								key={movie.id}
								draggable="true"
								onDragStart={() => handleDragStart(movie)}
								style={{ cursor: 'grab' }}
							>
								<List.Item.Meta title={movie.name} description={`${movie.running_time} phút`} />
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default ShowtimeSchedulerNew;
