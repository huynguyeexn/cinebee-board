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
const ComboTicketDashboardPage = React.lazy(() => import('app/features/comboTicket/dashboard'));
const ComboTicketAddEditPage = React.lazy(
	() => import('app/features/comboTicket/addEditPage/AddEditPage')
);
const EmployeeDashboard = React.lazy(() => import('app/features/Employee/dashboard'));
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
		permissions: [],
	},
	{
		path: '/admin/item',
		component: ItemDashboardPage,
		permissions: [],
	},
	{
		path: '/admin/combo/new',
		component: ComboAddEditPage,
		permissions: [],
	},
	{
		path: '/admin/combo/:id/edit',
		component: ComboAddEditPage,
		permissions: [],
	},
	{
		path: '/admin/comboticket',
		component: ComboTicketDashboardPage,
		permissions: [],
	},
	{
		path: '/admin/comboticket/:id/edit',
		component: ComboTicketAddEditPage,
		permissions: [],
	},
	{
		path: '/admin/comboticket/new',
		component: ComboTicketAddEditPage,
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
		permissions: [],
	},
	{
         path: '/admin/blog',
		 component: BlogDashboard,
		 permissions: [],
	},
	{
		path: '/admin/blog/add',
		component: BlogAdd,
		permissions: [],
	},
	{
          path: '/admin/blog/:id_blog/edit',
		  component: BlogAdd,
		  permissions:[],
	},
	{
		path: '/admin/about',
		component: AccountAboutPage,
		permissions: [],
	},


];
