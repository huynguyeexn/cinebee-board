import { Button, Col, List, Row, Space, Spin } from 'antd';
import showtimeApi from 'app/api/showtimeApi';
import {
	movieActions,
	selectMovieFilter,
	selectMovieList,
	selectMovieListLoading
} from 'app/features/movie/redux/movieSlice';
import {
	roomActions,
	selectRoomFilter,
	selectRoomList,
	selectRoomListLoading
} from 'app/features/room/redux/roomSlice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { selectShowtimeList, selectShowtimeListLoading, showtimeActions } from '../redux/showtimeSlice';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

// const actions = SHOWTIME_ACTIONS;

const minTime = new Date().setHours(8, 0, 0);
const maxTime = new Date().setHours(23, 0, 0);

const ShowtimeScheduler = () => {
	const dispatch = useAppDispatch();
	const movieFilter = useAppSelector(selectMovieFilter);
	const movieLoading = useAppSelector(selectMovieListLoading);
	const movies = useAppSelector(selectMovieList);

	const roomFilter = useAppSelector(selectRoomFilter);
	const roomLoading = useAppSelector(selectRoomListLoading);
	const rooms = useAppSelector(selectRoomList);

	const showtimeLoading = useAppSelector(selectShowtimeListLoading);
	const showtimes = useAppSelector(selectShowtimeList);

	const [events, setEvents] = React.useState([]);
	const [draggedEvent, setDraggedEvent] = React.useState(null);
	const [deletedEvents, setDeletedEvents] = React.useState([]);
	const [displayDragItemInCell] = React.useState(true);

	React.useEffect(() => {
		console.log(`events`, events);
	}, [events]);

	React.useEffect(() => {
		const eventsMap = showtimes.map(el => ({
			allDay: false,
			end: moment(el.end).add(7, "hours").toDate(),
			id: el.id,
			movie_id: el.movie_id,
			resource: el.room_id,
			resourceId: el.room_id,
			room_id: el.room_id,
			start: moment(el.start).add(7, "hours").toDate(),
			title: el.movie.name,
		}))
		setEvents(eventsMap);
	}, [showtimes]);

	React.useEffect(() => {
		const filterMovie = {
			...movieFilter,
			filter_by: 'status',
			filter: 1,
		};
		const filterRooms = {
			...roomFilter,
			per_page: 100,
		};
		dispatch(movieActions.getList(filterMovie));
		dispatch(roomActions.getList(filterRooms));
		dispatch(showtimeActions.getList({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

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
			end: moment(value.start.getTime() + movie.running_time * 60000),
			id: Date.now(),
			title: movie.name,
			movie_id: movie.id,
			room_id: value.resource,
		};
		setDraggedEvent(null);
		newEvent(event);
	};

	const newEvent = (event) => {
		const newEvents = events.concat([event]);
		setEvents(newEvents);
	};

	const removeEvent = (event) => {
		const newEvents = [...events];
		setEvents(newEvents.filter((e) => e.id !== event.id));
		setDeletedEvents([...deletedEvents, event.id])
	};

	const handleOnSave = async () => {
		await showtimeApi.update(
		{
			events: events.map(el => ({
				id: el.id,
				movie_id: el.movie_id,
				room_id: el.resourceId,
				end: new Date(el.end),
				start: new Date(el.start),
			})),
			deleted: deletedEvents,
		});
	}

	return (
		<div>
			<Row gutter={[8, 8]}>
				<Col span={18}>
					<Spin spinning={roomLoading && showtimeLoading}>
						<DragAndDropCalendar
							onDoubleClickEvent={removeEvent}
							selectable
							localizer={localizer}
							events={events}
							onEventDrop={moveEvent}
							resizable={false}
							resources={rooms}
							resourceIdAccessor="id"
							resourceTitleAccessor="name"
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
					</Spin>
				</Col>
				<Col span={6}>
					<div className="" style={{ position: 'sticky', top: 0 }}>
						<Space size={8} style={{ marginBottom: '16px' }}>
							<Button>Xóa hết</Button>
							<Button type="primary" onClick={handleOnSave}>Lưu</Button>
						</Space>
						{/* <List
							style={{ marginBottom: '16px' }}
							size="small"
							header={<div>Hành động</div>}
							bordered
							dataSource={actions}
							renderItem={(action) => (
								<List.Item
									key={action.id}
									draggable="true"
									onDragStart={() => handleDragStart(action)}
									style={{ cursor: 'grab' }}
								>
									<List.Item.Meta title={action.name} description={`${action.running_time} phút`} />
								</List.Item>
							)}
						/> */}
						<List
							loading={movieLoading}
							style={{ marginBottom: '16px' }}
							size="small"
							header={<div>Phim đang chiếu</div>}
							bordered
							dataSource={movies}
							renderItem={(action) => (
								<List.Item
									key={action.id}
									draggable="true"
									onDragStart={() => handleDragStart(action)}
									style={{ cursor: 'grab' }}
								>
									<List.Item.Meta title={action.name} description={`${action.running_time} phút`} />
								</List.Item>
							)}
						/>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default ShowtimeScheduler;
