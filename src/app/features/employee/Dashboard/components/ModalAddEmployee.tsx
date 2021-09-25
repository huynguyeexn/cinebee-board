import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal } from 'antd';
import { selectEmployeeRoleOptions } from 'app/features/employeeRole/Redux/employeeRoleSlice';
import { Employee } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import {
	InputField,
	RadioGroupField,
	SelectField,
} from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { employeeActions, selectEmployeeActionLoading } from '../../Redux/employeeSlice';


interface Props {
	isModalVisible: boolean;
	onCancel: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const formValidate = yup.object().shape({
	fullname: yup.string().required(),
	username: yup.string().required(),
	password: yup.string().min(8).nullable(),
	phone: yup
		.string()
		.matches(/^0[0-9]{9,10}/)
		.nullable(),
	email: yup.string().email().nullable(),
	address: yup.string().nullable(),
	birthday: yup.string().nullable(),
	sex: yup.number().nullable(),
	employee_role_id: yup.number().nullable(),
});

const ModalAddEmployee = ({ isModalVisible, onCancel }: Props) => {
	const dispatch = useAppDispatch();
	const typeOptions = useAppSelector(selectEmployeeRoleOptions);
	const loading = useAppSelector(selectEmployeeActionLoading);

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(formValidate),
	});

	const handleSubmitForm = async (data: Employee) => {
		dispatch(employeeActions.create(data));
	};

	return (
		<Modal
			title="Thông tin nhân viên"
			visible={isModalVisible}
			onOk={handleSubmit(handleSubmitForm)}
			onCancel={onCancel}
			confirmLoading={loading}
			okText="Lưu"
		>
			<Form layout="vertical" initialValues={{ gender: 0 }}>
				<InputField control={control} name="username" label="Tên truy cập" required />
				<InputField
					control={control}
					name="password"
					label="Mật khẩu"
					required
					type="password"
				/>
				<InputField control={control} name="fullname" label="Họ và tên" required />
				<DatePickerField control={control} name="birthday" label="Ngày sinh" />
				<InputField control={control} name="phone" label="Số điện thoại" />
				<InputField control={control} name="email" label="Email" type="email" />
				<InputField control={control} name="address" label="Địa chỉ" />
				<RadioGroupField
					control={control}
					label="Giới tính"
					name="sex"
					options={[
						{
							label: 'Nam',
							value: 0,
						},
						{
							label: 'Nữ',
							value: 1,
						},
						{
							label: 'Khác',
							value: 2,
						},
					]}
				/>
				<SelectField
					control={control}
					name="employee_role_id"
					label="Chức vụ"
					options={typeOptions}
				/>
			</Form>
		</Modal>
	);
};

export default ModalAddEmployee;
