import { IconType } from 'react-icons';
import { GiTempleDoor, GiPopcorn } from 'react-icons/gi';
import { MdCardTravel } from 'react-icons/md';

import { RiMovie2Line } from 'react-icons/ri';

import {
	HiOutlineCalendar,
	HiOutlineChartBar,
	HiOutlineTicket,
	HiOutlineUsers,
} from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineContainer,AiOutlineUsergroupAdd } from 'react-icons/ai';
import {FaLock} from 'react-icons/fa';

interface IMenu {
	path: string;
	label: string;
	icon: IconType;
	child?: IMenu[];
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
	},
	{
		path: '/admin/movies',
		label: 'Phim',
		icon: RiMovie2Line,
	},
	{
		path: '/admin/actors',
		label: 'Diễn viên',
		icon: FiUsers,
	},
	{
		path: '/admin/genres',
		label: 'Thể loại phim',
		icon: AiOutlineContainer,
	},
	{
		path: '/admin/role',
		label: "Phân quyền",
		icon: FaLock,
	},
	{
		path: '/admin/permission',
		label: "Nhóm quyền",
		icon: AiOutlineUsergroupAdd,
	}
];
