import AddCustomer from 'app/features/customer/Add'
import CustomerDashboard from 'app/features/customer/Dashboard'
import DetailCustomer from 'app/features/customer/Detail'
import DashboardPage from 'app/features/dashboard/dashboardPage'
import RoomAddPage from 'app/features/room/Add/roomAddPage'
import RoomDashboard from 'app/features/room/Dashboard'
import RoomEditPage from 'app/features/room/Edit/roomEditPage'
import React from 'react'

interface IRoute {
    path: string;
    component: React.FC;
}

export const routers: IRoute[] = [
    {
        path: "/admin/dashboard",
        component: DashboardPage,
    },

    /**
     * @Rooms
     * --> List
     * --> Add
     * --> Edit @param id
     */
    {
        path: "/admin/rooms",
        component: RoomDashboard,
    },
    {
        path: "/admin/rooms/create",
        component: RoomAddPage,
    },
    {
        path: "/admin/rooms/edit/:id",
        component: RoomEditPage,
    },

    
    /**
     * @Customer
     * --> List
     * --> Add
     * --> Edit @param id
     */
     {
        path: "/admin/customers",
        component: CustomerDashboard,
    },
    {
        path: "/admin/customers/create",
        component: AddCustomer,
    },
    {
        path: "/admin/customers/:id",
        component: DetailCustomer,
    },
    {
        path: "/admin/customers/edit/:id",
        component: RoomEditPage,
    },
]