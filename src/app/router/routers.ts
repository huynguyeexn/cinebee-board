import DashboardPage from 'app/features/dashboard/dashboardPage'
import RoomAddPage from 'app/features/room/Add/roomAddPage'
import RoomEditPage from 'app/features/room/Edit/roomEditPage'
import RoomPage from 'app/features/room/roomPage'
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
        component: RoomPage,
    },
    {
        path: "/admin/rooms/create",
        component: RoomAddPage,
    },
    {
        path: "/admin/rooms/edit/:id",
        component: RoomEditPage,
    },
]