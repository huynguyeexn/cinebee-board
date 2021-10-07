import EmployeeRoleDashboardPage from 'app/features/employeeRole/dashboard';
import React from 'react';

const ActorDashboardPage = React.lazy(() => import('app/features/actors/dashboard'));
const CustomerDashboard = React.lazy(() => import('app/features/customer/dashboard'));
const DashboardPage = React.lazy(() => import('app/features/dashboard'));
const MovieDashboardPage = React.lazy(() => import('app/features/movie/dashboard'));
const GenresDashboardPage = React.lazy(() => import('app/features/genres/dashboard'));
const MovieAddEditPage = React.lazy(() => import('app/features/movie/addEditPage/AddEditPage'));
const EmployeeDashboard = React.lazy(() => import('app/features/employee/dashboard'));
const DirectorDashboardPage = React.lazy(() => import('app/features/director/dashboard'));

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
		path: '/admin/directors',
		component: DirectorDashboardPage,
	},
];
