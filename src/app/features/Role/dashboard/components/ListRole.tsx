import React from 'react'
import { Dropdown, Space, Button, Popconfirm } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { blue } from '@ant-design/colors';
import moment from 'moment';
import TableBase from 'app/utils/components/TableBase';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';
import { selectRoleList, selectRoleLoading, selectRolePagination, selectRoleFilter } from './../../redux/RoleSlide';
import {RoleActions} from '../../redux/RoleSlide';
import { Role } from 'app/interfaces';
import { Link } from 'react-router-dom';

interface Props {
    
}

const ListRole = (props: Props) => {
	const dispatch = useDispatch();
	const role = useAppSelector(selectRoleList);
	const loading = useAppSelector(selectRoleLoading);
	const pagination = useAppSelector(selectRolePagination);
    const filter = useAppSelector(selectRoleFilter);

	React.useEffect(()=>{
        dispatch(RoleActions.getList(filter));
	},[dispatch,filter]);
    const handlepageChange = (page: number, pageSize?: number)=>{
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};
		dispatch(RoleActions.setFilter(newFilter));
	}
    // xóa
	const handleDelete = (role: Role)=>{
        dispatch(RoleActions.deleteById(role));
	}
	
    const columns = [
        {
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
        {
			title: 'Cập nhật',
			key: 'updated_at',
			dataIndex: 'updated_at',
			render: (text: string) => <span>{moment(text).fromNow()}</span>,
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (render: Role) => (
				<Dropdown
					overlay={
						<Space size="middle">
							{/* <Button
								type="text"
								style={{ color: blue[3] }}
								onClick={() => onEdit(render)}
							>
								Sửa <AiOutlineEdit />
							</Button> */}
							<Link to={`role/${render.id}/edit`}>
								<Button type="text" style={{ color: blue[3] }}>
									Sửa <AiOutlineEdit />
								</Button>
							</Link>
							<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(render)}>
								<Button type="text" danger>
									Xóa <AiOutlineDelete />
								</Button>
							</Popconfirm>
						</Space>
					}
					trigger={['click']}
				>
					<Button style={{ margin: '0 auto' }}>
						<FiMoreHorizontal />
					</Button>
				</Dropdown>
			),
		},
    ]

    return (
        <>
        <TableBase
        columns={columns}
        dataSource={role}
		loading={loading}
		onPageChange={handlepageChange}
		pagination={pagination}
        />
        </>
    )
}

export default ListRole;
