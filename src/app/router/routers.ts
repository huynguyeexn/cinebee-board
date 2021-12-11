import { ComboTicketDashboard } from 'app/features/comboTicket/dasboard';
import { CustomerTypeDashboardPage } from 'app/features/customerType/dashboard';
import { MovieTicketDashboard } from 'app/features/movieTicket/dashboard';
import { orderDashboard } from 'app/features/order/dashboard';
import { PaymentDashboardPage } from 'app/features/payment/dashboard';
import { permissionsConfig } from 'app/constants';
import AccountAboutPage from 'app/features/accounts/aboutPage/accountAboutPage';

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
const BlogDashboard = React.lazy(() => import('app/features/Blog/Dashboard'));
const BlogAdd = React.lazy(() => import('app/features/Blog/components/Addblog'));
const BlogView = React.lazy(() => import('app/features/Blog/components/Blogview'));
interface IRoute {
	path: string;
	component: React.FC;
	permissions?: string[];
}

export const routers: IRoute[] = [
	{
		path: '/admin/dashboard',
		component: DashboardPage,
		permissions: [],
	},
	{
		path: '/admin/customers',
		component: CustomerDashboard,
		permissions: [permissionsConfig.customers.list],
	},
	{
		path: '/admin/employees',
		component: EmployeeDashboard,
		permissions: [permissionsConfig.employee.list],
	},
	{
		path: '/admin/employee-roles',
		component: EmployeeRoleDashboardPage,
		permissions: [permissionsConfig.role.list],
	},
	{
		path: '/admin/movies',
		component: MovieDashboardPage,
		permissions: [permissionsConfig.movies.list],
	},
	{
		path: '/admin/movies/new',
		component: MovieAddEditPage,
		permissions: [permissionsConfig.movies.list],
	},
	{
		path: '/admin/movies/:id/edit',
		component: MovieAddEditPage,
		permissions: [permissionsConfig.movies.list],
	},
	{
		path: '/admin/actors',
		component: ActorDashboardPage,
		permissions: [permissionsConfig.actors.list],
	},
	{
		path: '/admin/genres',
		component: GenresDashboardPage,
		permissions: [permissionsConfig.genres.list],
	},
	{
		path: '/admin/combo',
		component: ComboDashboardPage,
		permissions: [permissionsConfig.combo.list],
	},
	{
		path: '/admin/item',
		component: ItemDashboardPage,
		permissions: [permissionsConfig.items.list],
	},
	{
		path: '/admin/combo/new',
		component: ComboAddEditPage,
		permissions: [permissionsConfig.combo.create],
	},
	{
		path: '/admin/combo/:id/edit',
		component: ComboAddEditPage,
		permissions: [permissionsConfig.combo.edit, permissionsConfig.combo.update],
	},
	{
		path: '/admin/comboticket',
		component: ComboTicketDashboard,
		permissions: [],
	},
	{
		path: '/admin/directors',
		component: DirectorDashboardPage,
		permissions: [permissionsConfig.directors.list],
	},
	{
		path: '/admin/rooms',
		component: RoomDashboardPage,
		permissions: [permissionsConfig.rooms.list],
	},
	{
		path: '/admin/rooms/new',
		component: AddEditRoomPage,
		permissions: [permissionsConfig.rooms.list],
	},
	{
		path: '/admin/rooms/:id',
		component: DetailRoomPage,
		permissions: [permissionsConfig.rooms.list],
	},
	{
		path: '/admin/rooms/:id/edit',
		component: AddEditRoomPage,
		permissions: [permissionsConfig.rooms.list],
	},
	{
		path: '/admin/showtime',
		component: ShowtimeDashboardPage,
		permissions: [permissionsConfig.rooms.list],
	},
	{
		path: '/admin/categories',
		component: CategoryDashboardPage,
		permissions: [permissionsConfig.categories.list],
	},
	{
		path: '/admin/blog',
		component: BlogDashboard,
		permissions: [permissionsConfig.blogs.list],
	},
	{
		path: '/admin/blog/add',
		component: BlogAdd,
		permissions: [permissionsConfig.blogs.create],
	},
	{
		path: '/admin/blog/:id_blog/edit',
		component: BlogAdd,
		permissions: [permissionsConfig.blogs.edit, permissionsConfig.blogs.update],
	},
	{
		path: '/admin/blog/:id/view',
		component: BlogView,
		permissions: [permissionsConfig.blogs.list],
	},
	{
		path: '/admin/about',
		component: AccountAboutPage,
		permissions: [],
	},
	{
		path: '/admin/payments',
		component: PaymentDashboardPage,
		permissions: [permissionsConfig.payments.list],
	},
	{
		path: '/admin/customer-types',
		component: CustomerTypeDashboardPage,
		permissions: [permissionsConfig.customer_types.list],
	},
	{
		path: '/admin/movie-tickets',
		component: MovieTicketDashboard,
		permissions: [permissionsConfig.movie_tickets.list],
	},
	{
		path: '/admin/combo-tickets',
		component: ComboTicketDashboard,
		permissions: [permissionsConfig.combo_tickets.list],
	},
	{
		path: '/admin/orders',
		component: orderDashboard,
		permissions: [permissionsConfig.orders.list],
	},
];
