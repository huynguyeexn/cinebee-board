import { blue } from '@ant-design/colors';
import { Button, Popconfirm, Space } from 'antd';
import { EmployeeRole } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import moment from 'moment';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
	employeeRoleActions,
	selectEmployeeRoleFilter,
	selectEmployeeRoleList,
	selectEmployeeRoleListLoading,
	selectEmployeeRolePagination,
} from '../../redux/employeeRoleSlice';

interface Props {
	onEdit: (employeeRole: EmployeeRole) => void;
}

export const ListEmployeeRole = ({ onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const employeeRoles = useAppSelector(selectEmployeeRoleList);
	const loading = useAppSelector(selectEmployeeRoleListLoading);
	const pagination = useAppSelector(selectEmployeeRolePagination);
	const filter = useAppSelector(selectEmployeeRoleFilter);

	React.useEffect(() => {
		dispatch(employeeRoleActions.getList(filter));
	}, [dispatch, filter]);

	const handelPageChange = (page: number, pageSize?: number) => {
		const newFilter = {
			...filter,
			page: page,
			perPage: pageSize,
		};
		dispatch(employeeRoleActions.setFilter(newFilter));
	};

	const handleDelete = (employeeRole: EmployeeRole) => {
		dispatch(employeeRoleActions.deleteById(employeeRole));
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 100,
		},
		{
			title: 'Tên Chức Vụ',
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
			title: 'Thao tác',
			key: 'action',
			fixed: 'right',
			width: 125,
			render: (record: EmployeeRole) => (
				<Space size="middle">
					<Button
						type="default"
						style={{ color: blue[3], borderColor: blue[3] }}
						onClick={() => onEdit(record)}
					>
						<AiOutlineEdit />
					</Button>
					<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
						<Button type="default" danger>
							<AiOutlineDelete />
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<TableBase
			columns={columns}
			dataSource={employeeRoles}
			loading={loading}
			onPageChange={handelPageChange}
			pagination={pagination}
		/>
	);
};
