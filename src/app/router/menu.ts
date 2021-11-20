import { IconType } from 'react-icons';
import { AiOutlineContainer } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { GiTempleDoor } from 'react-icons/gi';
import {
	HiOutlineCalendar,
	HiOutlineChartBar,
	HiOutlineTicket,
	HiOutlineUsers
} from 'react-icons/hi';
import {
	MdCardTravel, MdSubtitles
} from 'react-icons/md';
import { RiMovie2Line } from 'react-icons/ri';


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
		path: '/admin/employees',
		label: 'Nhân viên',
		icon: MdCardTravel,
	},
	{
		path: '/admin/employee-roles',
		label: 'Chức Vụ',
		icon: MdSubtitles,
	},
	{
		path: '/admin/customers',
		label: 'Khách hàng',
		icon: HiOutlineUsers,
	},
/* 	{
		path: '/admin/comboticket',
		label: 'Combo vé',
		icon: AiOutlineContainer,
	}, */
	{
		path: '/admin/combo',
		label: 'Combo thức ăn',
		icon: AiOutlineContainer,
	},
	{
		path: '/admin/item',
		label: 'Thức ăn',
		icon: AiOutlineContainer,
	},
	{
		path: '/admin/movies',
		label: 'Phim',
		icon: RiMovie2Line,
	},
	{
		path: '/admin/genres',
		label: 'Thể loại phim',
		icon: AiOutlineContainer,
	},
	{
		path: '/admin/actors',
		label: 'Diễn viên',
		icon: FiUsers,
	},
	{
		path: '/admin/directors',
		label: 'Đạo diễn',
		icon: FiUsers,
	},
	{
		path: '/admin/categories',
		label: 'Thể Loại bài viết',
		icon: AiOutlineContainer,
	},
	{
		path: '/admin/blog',
		label: 'Bài viết',
		icon: AiOutlineContainer,
	}
];
