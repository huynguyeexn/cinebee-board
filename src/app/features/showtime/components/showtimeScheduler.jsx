import { Button, Col, DatePicker, List, Popconfirm, Row, Space, Spin, Typography } from 'antd';
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
	selectShowtimeActionLoading,
	selectShowtimeList,
	selectShowtimeListLoading,
	showtimeActions,
} from '../redux/showtimeSlice';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const minTime = new Date().setHours(8, 0, 0);
const maxTime = new Date().setHours(23, 0, 0);

const renderListMovie = (movie, loading, title, titleType = 'success', handleDragStart) => {
	return (
		<List
			loading={loading}
			style={{ marginBottom: '16px' }}
			size="small"
			header={
				<Typography.Text type={titleType} strong>
					{title}
				</Typography.Text>
			}
			bordered
			dataSource={movie}
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
	);
};

const renderNavigate = (dateSelected, handleDateNavigate) => {
	return (
		<>
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
		</>
	);
};

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

	const showtimeActionLoading = useAppSelector(selectShowtimeActionLoading);
	const showtimeLoading = useAppSelector(selectShowtimeListLoading);
	const showtimes = useAppSelector(selectShowtimeList);

	const [dateSelected, setDateSelected] = React.useState();
	const [events, setEvents] = React.useState([]);
	const [draggedEvent, setDraggedEvent] = React.useState(null);
	const [deletedEvents, setDeletedEvents] = React.useState([]);
	const [displayDragItemInCell] = React.useState(true);

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
			movie_status_id: el.movie.status,
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
		console.log(`movie`, movie);
		const event = {
			...value,
			resourceId: value.resource,
			end: moment(value.start.getTime() + movie.running_time * 60000),
			id: Date.now(),
			title: movie.name,
			movie_id: movie.id,
			room_id: value.resource,
			movie_status_id: movie.status,
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

	const handleOnSave = () => {
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

	const handleClear = () => {
		setDeletedEvents(events.map((e) => e.id));
		setEvents([]);
	};

	const handleOnRefresh = () => {
		setDeletedEvents([]);
		dispatch(
			showtimeActions.getList({
				date: moment(dateSelected).format(),
			})
		);
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

	const eventPropGetter = (event) => {
		switch (event.movie_status_id) {
			case 0:
				return { className: 'ngung-chieu' };
			case 1:
				return { className: 'dang-chieu' };
			case 2:
				return { className: 'sap-chieu' };
			default:
				return;
		}
	};

	return (
		<Spin spinning={showtimeActionLoading}>
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
								eventPropGetter={eventPropGetter}
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
								<Col span={24}>{renderNavigate(dateSelected, handleDateNavigate)}</Col>
							</Row>
							{renderListMovie(
								moviesPlaying,
								moviePlayingLoading,
								'Phim đang chiếu',
								'success',
								handleDragStart
							)}
							{renderListMovie(
								moviesComing,
								movieComingLoading,
								'Phim sắp chiếu',
								'warning',
								handleDragStart
							)}
							<Row>
								<Col span={24}>
									<Space size={8} style={{ marginBottom: '16px' }}>
										<Button type="primary" onClick={handleOnSave}>
											Lưu
										</Button>
										<Button type="default" onClick={handleOnRefresh}>
											Tải lại
										</Button>
										<Popconfirm
											title="Bạn có chắc chắn rằng muốn xóa hết lịch chiếu trong ngày này?"
											onConfirm={handleClear}
											okText="Yes"
											cancelText="No"
										>
											<Button danger type="default">
												Xóa hết
											</Button>
										</Popconfirm>
										,
									</Space>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			)}
		</Spin>
	);
};

export default ShowtimeScheduler;
