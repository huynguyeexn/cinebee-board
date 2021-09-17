import AddCustomer from 'app/features/customer/Add';
import CustomerDashboard from 'app/features/customer/Dashboard';
import DetailCustomer from 'app/features/customer/Detail';
import DashboardPage from 'app/features/dashboard/dashboardPage';
import EmployeeDashboard from 'app/features/employee/Dashboard';
import MovieDashboard from 'app/features/movie/Dashboard/dashboard';
import MovieEdit from 'app/features/movie/Edit';
import RoomAddPage from 'app/features/room/Add/roomAddPage';
import RoomDashboard from 'app/features/room/Dashboard';
import RoomEditPage from 'app/features/room/Edit/roomEditPage';
import React from 'react';

interface IRoute {
	path: string;
	component: React.FC;
}

export const routers: IRoute[] = [
	{
		path: '/admin/dashboard',
		component: DashboardPage,
	},

	/**
	 * @Rooms
	 * --> List
	 * --> Add
	 * --> Edit @param id
	 */
	{
		path: '/admin/rooms',
		component: RoomDashboard,
	},
	{
		path: '/admin/rooms/create',
		component: RoomAddPage,
	},
	{
		path: '/admin/rooms/edit/:id',
		component: RoomEditPage,
	},

	/**
	 * @Customer
	 * --> List
	 * --> Add
	 * --> Edit @param id
	 */
	{
		path: '/admin/customers',
		component: CustomerDashboard,
	},
	{
		path: '/admin/customers/create',
		component: AddCustomer,
	},
	{
		path: '/admin/customers/:id',
		component: DetailCustomer,
	},
	{
		path: '/admin/customers/edit/:id',
		component: RoomEditPage,
	},

	/**
	 * @Movies
	 * --> List
	 * --> Add
	 * --> Edit @param id
	 */
	{
		path: '/admin/movies',
		component: MovieDashboard,
	},
	// {
	// 	path: '/admin/customers/create',
	// 	component: AddCustomer,
	// },
	// {
	// 	path: '/admin/movies/:id',
	// 	component: DetailCustomer,
	// },
	{
		path: '/admin/movies/:id',
		component: MovieEdit,
	},

	/**
	 * @Employees
	 * --> List
	 * --> Add
	 * --> Edit @param id
	 */
	{
		path: '/admin/employees',
		component: EmployeeDashboard,
	},
	// {
	// 	path: '/admin/customers/create',
	// 	component: AddCustomer,
	// },
	// {
	// 	path: '/admin/movies/:id',
	// 	component: DetailCustomer,
	// },
	// {
	// 	path: '/admin/movies/:id',
	// 	component: MovieEdit,
	// },
];
