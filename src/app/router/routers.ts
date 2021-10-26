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

];
