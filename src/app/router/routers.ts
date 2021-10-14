import React from 'react';

const ActorDashboardPage = React.lazy(() => import('app/features/actors/dashboard'));
const CustomerDashboard = React.lazy(() => import('app/features/customer/dashboard'));
const DashboardPage = React.lazy(() => import('app/features/dashboard'));
const MovieDashboardPage = React.lazy(() => import('app/features/movie/dashboard'));
const GenresDashboardPage = React.lazy(() => import('app/features/genres/dashboard'));
const MovieAddEditPage = React.lazy(() => import('app/features/movie/addEditPage/AddEditPage'));
const DirectorDashboardPage = React.lazy(() => import('app/features/director/dashboard'));
const RoomDashboardPage = React.lazy(() => import('app/features/room/dashboard'));
const ShowtimeDashboardPage = React.lazy(() => import('app/features/showtime/dashboard'));
const AddEditRoomPage = React.lazy(
	() => import('app/features/room/addEditRoomPage/AddEditRoomPage')
);
const DetailRoomPage = React.lazy(() => import('app/features/room/detailRoomPage/DetailRoomPage'));

interface IRoute {
	path: string;
	component: React.FC;
}

export const routers: IRoute[] = [
	{
		path: '/admin/dashboard',
		component: DashboardPage,
	},
	{
		path: '/admin/customers',
		component: CustomerDashboard,
	},
	{
		path: '/admin/movies',
		component: MovieDashboardPage,
	},
	{
		path: '/admin/movies/new',
		component: MovieAddEditPage,
	},
	{
		path: '/admin/movies/:id/edit',
		component: MovieAddEditPage,
	},
	{
		path: '/admin/actors',
		component: ActorDashboardPage,
	},
	{
		path: '/admin/genres',
		component: GenresDashboardPage,
	},
	{
		path: '/admin/directors',
		component: DirectorDashboardPage,
	},
	{
		path: '/admin/rooms',
		component: RoomDashboardPage,
	},
	{
		path: '/admin/rooms/new',
		component: AddEditRoomPage,
	},
	{
		path: '/admin/rooms/:id',
		component: DetailRoomPage,
	},
	{
		path: '/admin/rooms/:id/edit',
		component: AddEditRoomPage,
	},
	{
		path: '/admin/showtime',
		component: ShowtimeDashboardPage,
	},
];
