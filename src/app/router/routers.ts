import React from 'react';

const ActorDashboardPage = React.lazy(() => import('app/features/actors/dashboard'));
const CustomerDashboard = React.lazy(() => import('app/features/customer/dashboard'));
const DashboardPage = React.lazy(() => import('app/features/dashboard'));
const MovieDashboardPage = React.lazy(() => import('app/features/movie/dashboard'));
const GenresDashboardPage = React.lazy(() => import('app/features/genres/dashboard'));
const MovieAddEditPage = React.lazy(() => import('app/features/movie/addEditPage/AddEditPage'));
const ComboDashboardPage = React.lazy(() => import('app/features/combo/dashboard'));
const ItemDashboardPage = React.lazy(() => import('app/features/item/dashboard'));
const ComboAddEditPage = React.lazy(() => import('app/features/combo/addEditPage/AddEditPage'));
const ComboTicketDashboardPage = React.lazy(() => import('app/features/comboTicket/dashboard'));
const ComboTicketAddEditPage = React.lazy(() => import('app/features/comboTicket/addEditPage/AddEditPage'));
const EmployeeDashboard = React.lazy(() => import('app/features/employee/dashboard'));
const DirectorDashboardPage = React.lazy(() => import('app/features/director/dashboard'));
const RoomDashboardPage = React.lazy(() => import('app/features/room/dashboard'));
const ShowtimeDashboardPage = React.lazy(() => import('app/features/showtime/dashboard'));
const AddEditRoomPage = React.lazy(
	() => import('app/features/room/addEditRoomPage/AddEditRoomPage')
);
const DetailRoomPage = React.lazy(() => import('app/features/room/detailRoomPage/DetailRoomPage'));
const CategoryDashboardPage = React.lazy(() => import('app/features/category/dashboard'));
const EmployeeRoleDashboardPage = React.lazy(() => import('app/features/employeeRole/dashboard'));

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
	// // {
	// // 	path: '/admin/customers/create',
	// // 	component: AddCustomer,
	// // },
	// // {
	// // 	path: '/admin/movies/:id',
	// // 	component: DetailCustomer,
	// // },
	// {
	// 	path: '/admin/movies/:id',
	// 	component: MovieEdit,
	// },
	{
		path: '/admin/employees',
		component: EmployeeDashboard,
	},
	{
		path: '/admin/employee-roles',
		component: EmployeeRoleDashboardPage,
	},
	// {
	// 	path: '/admin/customers/create',
	// 	component: AddCustomer,
	// },
	// {
	// 	path: '/admin/customers/:id',
	// 	component: DetailCustomer,
	// },
	// {
	// 	path: '/admin/customers/edit/:id',
	// 	component: RoomEditPage,
	// },
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
		path: '/admin/combo',
		component: ComboDashboardPage,
	},
	{
		path: '/admin/item',
		component: ItemDashboardPage,
	},
	{
		path: '/admin/combo/new',
		component: ComboAddEditPage,
	},
	{
		path: '/admin/combo/:id/edit',
		component: ComboAddEditPage,
	},
	{
		path: '/admin/comboticket',
		component: ComboTicketDashboardPage,
	},
	{
		path: '/admin/comboticket/:id/edit',
		component: ComboTicketAddEditPage,
	},
	{
		path: '/admin/comboticket/new',
		component: ComboTicketAddEditPage,
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
	{
		path: '/admin/categories',
		component: CategoryDashboardPage,
	},
];
