import { Button, Col, Form, Input } from 'antd';
import { EmployeeRole } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import React from 'react';
import { employeeRoleActions, selectEmployeeRoleActionLoading } from '../../redux/employeeRoleSlice';
import PermissionsTable from './PermissionsTable';

interface Props {
	onCancel: () => void;
	isEdit?: boolean;
	data?: EmployeeRole;
}

export const AddEditEmployeeRole = ({ onCancel, isEdit = false, data }: Props) => {
	const saveLoading = useAppSelector(selectEmployeeRoleActionLoading);
	const dispatch = useAppDispatch();

	const onFinish = (values: any) => {
		values = {
			...data,
			...values,
		}
		console.log(`values`, values);
		if (isEdit) {
			dispatch(employeeRoleActions.update(values));
		} else {
			dispatch(employeeRoleActions.create(values));
		}
	};
	return (
			<Form
				layout="vertical"
				name="validate_other"
				onFinish={onFinish}
				initialValues={{
					permissions: data?.permissions_full.map((x) => x.id) || [],
					name: data?.name || '',
				}}
			>
				<Form.Item name="name" label="Tên chức vụ" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Col span={24}>
					<PermissionsTable name="permissions" />
				</Col>
				{/* Form actions */}
				<Col span={24} style={{ textAlign: 'right' }}>
					{/* <Button style={{ margin: '0 8px' }} onClick={() => reset()} type="link">
						Clear
					</Button> */}
					<Button
						onClick={() => {
							onCancel();
						}}
					>
						Hủy
					</Button>
					<Button
						loading={saveLoading}
						style={{ margin: '0 8px' }}
						htmlType="submit"
						type="primary"
					>
						Lưu
					</Button>
				</Col>
			</Form>
	);
};
