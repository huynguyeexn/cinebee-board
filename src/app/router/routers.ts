import CustomerDashboard from 'app/features/customer/dashboard';
import DashboardPage from 'app/features/dashboard';
import MovieDashboardPage from 'app/features/movie/dashboard';
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
	// /**
	//  * @Rooms
	//  * --> List
	//  * --> Add
	//  * --> Edit @param id
	//  */
	// {
	// 	path: '/admin/rooms',
	// 	component: RoomDashboard,
	// },
	// {
	// 	path: '/admin/rooms/create',
	// 	component: RoomAddPage,
	// },
	// {
	// 	path: '/admin/rooms/edit/:id',
	// 	component: RoomEditPage,
	// },
	// /**

	/* @Customer
	 * --> List
	 * --> Add
	 * --> Edit @param id
	 */
	{
		path: '/admin/customers',
		component: CustomerDashboard,
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
	/**
	//  * @Movies
	//  * --> List
	//  * --> Add
	//  * --> Edit @param id
	//  */
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
];
