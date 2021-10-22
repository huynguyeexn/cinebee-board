import { Button, Col, DatePicker, List, Row, Space, Spin, Typography } from 'antd';
import {
	movieActions,
	selectMovieFilter,
	selectMovieListComing,
	selectMovieListComingLoading,
	selectMovieListPlaying,
	selectMovieListPlayingLoading,
} from 'app/features/movie/redux/movieSlice';
import {
	roomActions,
	selectRoomFilter,
	selectRoomList,
	selectRoomListLoading,
} from 'app/features/room/redux/roomSlice';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import {
	selectShowtimeList,
	selectShowtimeListLoading,
	showtimeActions,
} from '../redux/showtimeSlice';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const minTime = new Date().setHours(8, 0, 0);
const maxTime = new Date().setHours(23, 0, 0);

const ShowtimeScheduler = () => {
	const dispatch = useAppDispatch();
	const movieFilter = useAppSelector(selectMovieFilter);

	const moviesPlaying = useAppSelector(selectMovieListPlaying);
	const moviePlayingLoading = useAppSelector(selectMovieListPlayingLoading);

	const moviesComing = useAppSelector(selectMovieListComing);
	const movieComingLoading = useAppSelector(selectMovieListComingLoading);

	const roomFilter = useAppSelector(selectRoomFilter);
	const roomLoading = useAppSelector(selectRoomListLoading);
	const rooms = useAppSelector(selectRoomList);

	const showtimeLoading = useAppSelector(selectShowtimeListLoading);
	const showtimes = useAppSelector(selectShowtimeList);

	const [dateSelected, setDateSelected] = React.useState();
	const [events, setEvents] = React.useState([]);
	const [draggedEvent, setDraggedEvent] = React.useState(null);
	const [deletedEvents, setDeletedEvents] = React.useState([]);
	const [displayDragItemInCell] = React.useState(true);
	// const [touched, setTouched] = React.useState(false);

	React.useEffect(() => {
		dispatch(
			showtimeActions.getList({
				date: moment(dateSelected).format(),
			})
		);
	}, [dispatch, dateSelected]);

	React.useEffect(() => {
		const eventsMap = showtimes.map((el) => ({
			allDay: false,
			end: moment(el.end).add(7, 'hours').toDate(),
			id: el.id,
			movie_id: el.movie_id,
			resource: el.room_id,
			resourceId: el.room_id,
			room_id: el.room_id,
			start: moment(el.start).add(7, 'hours').toDate(),
			title: el.movie.name,
		}));
		setEvents(eventsMap);
	}, [showtimes]);

	React.useEffect(() => {
		const filterMovie = {
			...movieFilter,
			per_page: 100,
		};
		const filterRooms = {
			...roomFilter,
			sort_by: 'name',
			sort_type: 'asc',
			per_page: 100,
		};
		dispatch(movieActions.getListPlaying(filterMovie));
		dispatch(movieActions.getListComing(filterMovie));
		dispatch(roomActions.getList(filterRooms));
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
		setDeletedEvents([...deletedEvents, event.id]);
	};

	const handleOnSave = async () => {
		const value = {
			events: events.map((el) => ({
				id: el.id,
				movie_id: el.movie_id,
				room_id: el.resourceId,
				end: new Date(el.end),
				start: new Date(el.start),
			})),
			deleted: deletedEvents,
		};

		dispatch(showtimeActions.save(value));
	};

	const handleDateNavigate = (action) => {
		switch (action) {
			case 'today':
				return setDateSelected(moment().toDate());
			case 'tomorrow':
				return setDateSelected(moment(dateSelected).add(1, 'day').toDate());
			case 'yesterday':
				return setDateSelected(moment(dateSelected).subtract(1, 'day').toDate());
			default:
				break;
		}
		if (!moment(action).isValid()) {
			return setDateSelected(moment().toDate());
		} else {
			return setDateSelected(moment(action).toDate());
		}
	};

	return (
		<div>
			{!roomLoading && !rooms.length ? (
				<p>Chưa có phòng chiếu</p>
			) : (
				<Row gutter={[8, 8]}>
					<Col span={18}>
						<Spin spinning={showtimeLoading || roomLoading}>
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
								defaultDate={new Date()}
								defaultView={Views.DAY}
								min={minTime}
								max={maxTime}
								timeslots={6}
								date={dateSelected}
								step={5}
								views={['day']}
								dragFromOutsideItem={displayDragItemInCell ? dragFromOutsideItem : null}
								onDropFromOutside={onDropFromOutside}
								onDragOver={customOnDragOver}
								toolbar={false}
								onD
							/>
							<Typography.Paragraph type="danger" italic>
								Double click (Nhấp đôi chuột) vào suất chiếu để xóa
							</Typography.Paragraph>
						</Spin>
					</Col>
					<Col span={6}>
						<div className="" style={{ position: 'sticky', top: 0 }}>
							<Row>
								<Col span={24}>
									<Typography.Paragraph strong>
										{moment(dateSelected).format('dddd, DD MMMM [năm] YYYY').toLocaleUpperCase()}
									</Typography.Paragraph>
									<Space size={8} style={{ marginBottom: '16px' }} wrap>
										<Button onClick={() => handleDateNavigate('yesterday')}>Hôm trước</Button>
										<Button
											type={moment(dateSelected).isSame(new Date(), 'day') ? 'primary' : ''}
											onClick={() => handleDateNavigate('today')}
										>
											Hôm nay
										</Button>
										<Button onClick={() => handleDateNavigate('tomorrow')}>Hôm sau</Button>
										<DatePicker onChange={handleDateNavigate} />
									</Space>
								</Col>
							</Row>
							<List
								loading={moviePlayingLoading}
								style={{ marginBottom: '16px' }}
								size="small"
								header={
									<Typography.Text type="success" strong>
										Phim đang chiếu
									</Typography.Text>
								}
								bordered
								dataSource={moviesPlaying}
								renderItem={(action) => (
									<List.Item
										key={action.id}
										draggable="true"
										onDragStart={() => handleDragStart(action)}
										style={{ cursor: 'grab' }}
									>
										<List.Item.Meta
											title={action.name}
											description={`${action.running_time} phút`}
										/>
									</List.Item>
								)}
							/>
							<List
								loading={movieComingLoading}
								style={{ marginBottom: '16px' }}
								size="small"
								header={
									<Typography.Text type="warning" strong>
										Phim sắp chiếu
									</Typography.Text>
								}
								bordered
								dataSource={moviesComing}
								renderItem={(action) => (
									<List.Item
										key={action.id}
										draggable="true"
										onDragStart={() => handleDragStart(action)}
										style={{ cursor: 'grab' }}
									>
										<List.Item.Meta
											title={action.name}
											description={`${action.running_time} phút`}
										/>
									</List.Item>
								)}
							/>
							<Row>
								<Col span={24}>
									<Space size={8} style={{ marginBottom: '16px' }}>
										<Button type="primary" onClick={handleOnSave}>
											Lưu
										</Button>
									</Space>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default ShowtimeScheduler;
