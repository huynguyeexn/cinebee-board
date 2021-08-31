
import { IconType } from 'react-icons';
import { GiTempleDoor, GiPopcorn } from 'react-icons/gi';
import { MdCardTravel } from 'react-icons/md';
import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineTicket, HiOutlineUsers } from 'react-icons/hi';

interface IMenu {
    path: string;
    label: string;
    icon: IconType;
}

export const menus: IMenu[] = [
    {
        path: '/admin/dashboard',
        label: 'Quản trị',
        icon: HiOutlineChartBar,
    },
    {
        path: '/admin/tickets',
        label: 'Vé',
        icon: HiOutlineTicket,
    },
    {
        path: '/admin/rooms',
        label: 'Phòng chiếu',
        icon: GiTempleDoor,
    },
    {
        path: '/admin/showtime',
        label: 'Lịch chiếu',
        icon: HiOutlineCalendar,
    },
    {
        path: '/admin/staff',
        label: 'Nhân viên',
        icon: MdCardTravel,
    },
    {
        path: '/admin/customers',
        label: 'Khách hàng',
        icon: HiOutlineUsers,
    },
    {
        path: '/admin/combo',
        label: 'Combo thức ăn',
        icon: GiPopcorn,
    }
]